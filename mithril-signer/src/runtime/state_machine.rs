use slog_scope::{crit, debug, error, info};
use std::{fmt::Display, thread::sleep, time::Duration};

use mithril_common::{
    crypto_helper::ProtocolInitializerError,
    entities::{
        Beacon, CertificatePending, Epoch, EpochSettings, SignedEntityType, SignerWithStake,
    },
};

use super::{Runner, RuntimeError};

/// Different possible states of the state machine.
#[derive(Debug, PartialEq, Eq)]
pub enum SignerState {
    /// Starting state
    Init,
    /// Hold the latest known epoch in order to help synchronisation
    /// with the aggregator
    Unregistered {
        /// Current Epoch
        epoch: Epoch,
    },

    /// `Registered` state. The Signer has successfuly registered against the
    /// Aggregator for this Epoch, it is now able to sign.
    Registered {
        /// Epoch when Signer may sign.
        epoch: Epoch,
    },

    /// `Signed` state. The Signer has signed the message for the
    /// current pending certificate.
    Signed {
        /// Epoch when Signer signed.
        epoch: Epoch,

        /// Entity type that is signed
        signed_entity_type: SignedEntityType,
    },
}

impl SignerState {
    /// Returns `true` if the state in `Init`
    pub fn is_init(&self) -> bool {
        matches!(*self, SignerState::Init)
    }

    /// Returns `true` if the state in `Unregistered`
    pub fn is_unregistered(&self) -> bool {
        matches!(*self, SignerState::Unregistered { epoch: _ })
    }

    /// Returns `true` if the state in `Registered`
    pub fn is_registered(&self) -> bool {
        matches!(*self, SignerState::Registered { epoch: _ })
    }

    /// Returns `true` if the state in `Signed`
    pub fn is_signed(&self) -> bool {
        matches!(
            *self,
            SignerState::Signed {
                epoch: _,
                signed_entity_type: _
            }
        )
    }
}

impl Display for SignerState {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Init => write!(f, "Init"),
            Self::Unregistered { epoch } => write!(f, "Unregistered - {epoch:?}"),
            Self::Registered { epoch } => write!(f, "Registered - {epoch}"),
            Self::Signed {
                epoch,
                signed_entity_type,
            } => write!(f, "Signed - {epoch} - {signed_entity_type:?}"),
        }
    }
}

/// The state machine is responsible of the execution of the signer automate.
pub struct StateMachine {
    state: SignerState,
    runner: Box<dyn Runner>,
    state_sleep: Duration,
}

impl StateMachine {
    /// Create a new StateMachine instance.
    pub fn new(
        starting_state: SignerState,
        runner: Box<dyn Runner>,
        state_sleep: Duration,
    ) -> Self {
        Self {
            state: starting_state,
            runner,
            state_sleep,
        }
    }

    /// Return the current state of the state machine.
    pub fn get_state(&self) -> &SignerState {
        &self.state
    }

    /// Launch the state machine until an error occurs or it is interrupted.
    pub async fn run(&mut self) -> Result<(), RuntimeError> {
        info!("STATE MACHINE: launching");

        loop {
            if let Err(e) = self.cycle().await {
                if e.is_critical() {
                    crit!("{e}");

                    return Err(e);
                } else {
                    error!("{e}");
                }
            }

            info!(
                "… Cycle finished, Sleeping for {} ms",
                self.state_sleep.as_millis()
            );
            sleep(self.state_sleep);
        }
    }

    /// Perform a cycle of the state machine.
    pub async fn cycle(&mut self) -> Result<(), RuntimeError> {
        info!("================================================================================");
        info!("STATE MACHINE: new cycle: {}", self.state);

        match &self.state {
            SignerState::Init => {
                self.state = self.transition_from_init_to_unregistered().await?;
            }
            SignerState::Unregistered { epoch } => {
                if let Some(new_beacon) = self.has_epoch_changed(*epoch).await? {
                    info!("→ Epoch has changed, transiting to UNREGISTERED");
                    self.state = self
                        .transition_from_unregistered_to_unregistered(new_beacon)
                        .await?;
                } else if let Some(epoch_settings) = self
                    .runner
                    .get_epoch_settings()
                    .await
                    .map_err(|e| RuntimeError::KeepState {
                        message: format!("could not retrieve epoch settings at epoch {epoch:?}"),
                        nested_error: Some(e),
                    })?
                {
                    info!("→ Epoch settings found");
                    if epoch_settings.epoch >= *epoch {
                        info!("new Epoch found");
                        info!(" ⋅ transiting to REGISTERED");
                        self.state = self
                            .transition_from_unregistered_to_registered(&epoch_settings)
                            .await?;
                    } else {
                        info!(
                            " ⋅ Epoch settings found, but its epoch is behind the known epoch, waiting…";
                            "epoch_settings" => ?epoch_settings,
                            "known_epoch" => ?epoch,
                        );
                    }
                } else {
                    info!("→ No epoch settings found yet, waiting…");
                }
            }
            SignerState::Registered { epoch } => {
                if let Some(new_epoch) = self.has_epoch_changed(*epoch).await? {
                    info!("→ Epoch has changed, transiting to UNREGISTERED");
                    self.state = self
                        .transition_from_registered_to_unregistered(new_epoch)
                        .await?;
                } else if let Some(pending_certificate) =
                    self.runner.get_pending_certificate().await.map_err(|e| {
                        RuntimeError::KeepState {
                            message: "could not fetch the pending certificate".to_string(),
                            nested_error: Some(e),
                        }
                    })?
                {
                    info!(
                        " ⋅ Epoch has NOT changed but there is a pending certificate";
                        "pending_certificate" => ?pending_certificate
                    );

                    if self
                        .runner
                        .can_i_sign(&pending_certificate)
                        .await
                        .map_err(|e| RuntimeError::KeepState {
                            message: "could not determine if I can sign certificate".to_string(),
                            nested_error: Some(e),
                        })?
                    {
                        info!(" → we can sign this certificate, transiting to SIGNED");
                        self.state = self
                            .transition_from_registered_to_signed(&pending_certificate)
                            .await?;
                    } else {
                        info!(" ⋅ cannot sign this pending certificate, waiting…");
                    }
                } else {
                    info!(" ⋅ no pending certificate, waiting…");
                }
            }
            SignerState::Signed {
                epoch,
                signed_entity_type,
            } => {
                if let Some(new_epoch) = self.has_epoch_changed(*epoch).await? {
                    info!(" → new Epoch detected, transiting to UNREGISTERED");
                    self.state = self
                        .transition_from_signed_to_unregistered(new_epoch)
                        .await?;
                } else if let Some(pending_certificate) =
                    self.runner.get_pending_certificate().await.map_err(|e| {
                        RuntimeError::KeepState {
                            message: "could not fetch the pending certificate".to_string(),
                            nested_error: Some(e),
                        }
                    })?
                {
                    info!(
                        " ⋅ Epoch has NOT changed but there is a pending certificate";
                        "pending_certificate" => ?pending_certificate
                    );
                    if pending_certificate.signed_entity_type == *signed_entity_type {
                        info!(" ⋅ pending certificate has not changed, waiting…");
                    } else {
                        info!(" → new pending certificate detected, transiting to REGISTERED");
                        self.state = self.transition_from_signed_to_registered(*epoch).await?;
                    }
                } else {
                    info!(" ⋅ no pending certificate, waiting…");
                }
            }
        };

        Ok(())
    }

    /// Return the new epoch if the epoch is different than the given one.
    async fn has_epoch_changed(&self, epoch: Epoch) -> Result<Option<Epoch>, RuntimeError> {
        let current_beacon = self
            .get_current_beacon("checking if epoch has changed")
            .await?;

        if current_beacon.epoch > epoch {
            Ok(Some(current_beacon.epoch))
        } else {
            Ok(None)
        }
    }

    async fn transition_from_unregistered_to_unregistered(
        &self,
        new_epoch: Epoch,
    ) -> Result<SignerState, RuntimeError> {
        self.update_era_checker(new_epoch, "unregistered → unregistered")
            .await?;

        Ok(SignerState::Unregistered { epoch: new_epoch })
    }

    async fn transition_from_init_to_unregistered(&self) -> Result<SignerState, RuntimeError> {
        let current_beacon = self.get_current_beacon("init → unregistered").await?;
        self.update_era_checker(current_beacon.epoch, "init → unregistered")
            .await?;

        Ok(SignerState::Unregistered {
            epoch: current_beacon.epoch,
        })
    }

    async fn transition_from_signed_to_unregistered(
        &self,
        epoch: Epoch,
    ) -> Result<SignerState, RuntimeError> {
        self.update_era_checker(epoch, "signed → unregistered")
            .await?;

        Ok(SignerState::Unregistered { epoch })
    }

    async fn transition_from_signed_to_registered(
        &self,
        epoch: Epoch,
    ) -> Result<SignerState, RuntimeError> {
        Ok(SignerState::Registered { epoch })
    }

    async fn transition_from_registered_to_unregistered(
        &self,
        epoch: Epoch,
    ) -> Result<SignerState, RuntimeError> {
        self.update_era_checker(epoch, "registered → unregistered")
            .await?;

        Ok(SignerState::Unregistered { epoch })
    }

    /// Launch the transition process from the `Unregistered` to the `Registered` state.
    async fn transition_from_unregistered_to_registered(
        &self,
        epoch_settings: &EpochSettings,
    ) -> Result<SignerState, RuntimeError> {
        let beacon = self.get_current_beacon("unregistered → registered").await?;
        self.runner.update_stake_distribution(beacon.epoch)
            .await
            .map_err(|e| RuntimeError::KeepState {
                message: format!("Could not update stake distribution in 'unregistered → registered' phase for epoch {:?}.", beacon.epoch),
                nested_error: Some(e) })?;

        self.runner. register_signer_to_aggregator(
            epoch_settings.epoch,
            &epoch_settings.next_protocol_parameters,
        )
        .await.map_err(|e| {
            if e.downcast_ref::<ProtocolInitializerError>().is_some(){
                RuntimeError::Critical { message: format!("Could not register to aggregator in 'unregistered → registered' phase for epoch {:?}.", beacon.epoch), nested_error: Some(e) }
            }else{
                RuntimeError::KeepState { message: format!("Could not register to aggregator in 'unregistered → registered' phase for epoch {:?}.", beacon.epoch), nested_error: Some(e) }
            }
        })?;

        Ok(SignerState::Registered {
            epoch: beacon.epoch,
        })
    }

    /// Launch the transition process from the `Registered` to the `Signed` state.
    async fn transition_from_registered_to_signed(
        &self,
        pending_certificate: &CertificatePending,
    ) -> Result<SignerState, RuntimeError> {
        let current_beacon = &pending_certificate.beacon;
        let (retrieval_epoch, next_retrieval_epoch) = (
            current_beacon.epoch.offset_to_signer_retrieval_epoch()?,
            current_beacon.epoch.offset_to_next_signer_retrieval_epoch(),
        );

        debug!(
            " > transition_from_registered_to_signed";
            "current_epoch" => ?current_beacon.epoch,
            "retrieval_epoch" => ?retrieval_epoch,
            "next_retrieval_epoch" => ?next_retrieval_epoch,
        );

        let signers: Vec<SignerWithStake> = self
            .runner
            .associate_signers_with_stake(retrieval_epoch, &pending_certificate.signers)
            .await
            .map_err(|e| RuntimeError::KeepState {
                message: format!("Could not associate current signers with stakes during 'registered → signed' phase (current beacon {current_beacon:?}, retrieval epoch {retrieval_epoch:?})"),
                nested_error: Some(e)
            })?;
        let next_signers: Vec<SignerWithStake> = self
            .runner
            .associate_signers_with_stake(next_retrieval_epoch, &pending_certificate.next_signers)
            .await
            .map_err(|e| RuntimeError::KeepState {
                message: format!("Could not associate next signers with stakes during 'registered → signed' phase (current beacon {current_beacon:?}, next retrieval epoch {next_retrieval_epoch:?})"),
                nested_error: Some(e)
            })?;

        let message = self
            .runner
            .compute_message(&pending_certificate.signed_entity_type, &next_signers)
            .await
            .map_err(|e| RuntimeError::KeepState {
                message: format!("Could not compute message during 'registered → signed' phase (current beacon {current_beacon:?})"),
                nested_error: Some(e)
            })?;
        let single_signatures = self
            .runner
            .compute_single_signature( current_beacon.epoch, &message, &signers)
            .await
            .map_err(|e| RuntimeError::KeepState {
                message: format!("Could not compute single signature during 'registered → signed' phase (current beacon {current_beacon:?})"),
                nested_error: Some(e)
            })?;
        self.runner.send_single_signature(&pending_certificate.signed_entity_type, single_signatures).await
            .map_err(|e| RuntimeError::KeepState {
                message: format!("Could not send single signature during 'registered → signed' phase (current beacon {current_beacon:?})"),
                nested_error: Some(e)
            })?;

        Ok(SignerState::Signed {
            epoch: current_beacon.epoch,
            signed_entity_type: pending_certificate.signed_entity_type.to_owned(),
        })
    }

    async fn get_current_beacon(&self, context: &str) -> Result<Beacon, RuntimeError> {
        let current_beacon =
            self.runner
                .get_current_beacon()
                .await
                .map_err(|e| RuntimeError::KeepState {
                    message: format!("Could not retrieve current beacon in context '{context}'."),
                    nested_error: Some(e),
                })?;

        Ok(current_beacon)
    }

    async fn update_era_checker(&self, epoch: Epoch, context: &str) -> Result<(), RuntimeError> {
        self.runner
            .update_era_checker(epoch)
            .await
            .map_err(|e| RuntimeError::Critical {
                message: format!(
                    "Could not update Era checker with context '{context}' for epoch {epoch:?}"
                ),
                nested_error: Some(e),
            })
    }
}

#[cfg(test)]
mod tests {
    use mithril_common::entities::Epoch;
    use mithril_common::{entities::ProtocolMessage, test_utils::fake_data};

    use super::*;
    use crate::runtime::runner::MockSignerRunner;

    fn init_state_machine(init_state: SignerState, runner: MockSignerRunner) -> StateMachine {
        StateMachine {
            state: init_state,
            runner: Box::new(runner),
            state_sleep: Duration::from_millis(100),
        }
    }

    #[tokio::test]
    async fn unregistered_epoch_settings_not_found() {
        let mut runner = MockSignerRunner::new();
        runner
            .expect_get_epoch_settings()
            .once()
            .returning(|| Ok(None));
        runner
            .expect_get_current_beacon()
            .once()
            .returning(|| Ok(fake_data::beacon()));
        let mut state_machine = init_state_machine(
            SignerState::Unregistered {
                epoch: fake_data::beacon().epoch,
            },
            runner,
        );
        state_machine
            .cycle()
            .await
            .expect("Cycling the state machine should not fail");

        assert_eq!(
            &SignerState::Unregistered {
                epoch: fake_data::beacon().epoch
            },
            state_machine.get_state()
        );
    }

    #[tokio::test]
    async fn unregistered_epoch_settings_behind_known_epoch() {
        let mut runner = MockSignerRunner::new();
        let epoch_settings = EpochSettings {
            epoch: Epoch(3),
            protocol_parameters: fake_data::protocol_parameters(),
            next_protocol_parameters: fake_data::protocol_parameters(),
        };
        let known_epoch = Epoch(4);
        runner
            .expect_get_epoch_settings()
            .once()
            .returning(move || Ok(Some(epoch_settings.to_owned())));
        runner.expect_get_current_beacon().once().returning(|| {
            let mut beacon = fake_data::beacon();
            beacon.epoch = Epoch(4);
            Ok(beacon)
        });
        let mut state_machine =
            init_state_machine(SignerState::Unregistered { epoch: known_epoch }, runner);
        state_machine
            .cycle()
            .await
            .expect("Cycling the state machine should not fail");

        assert_eq!(
            &SignerState::Unregistered { epoch: known_epoch },
            state_machine.get_state()
        );
    }

    #[tokio::test]
    async fn unregistered_to_registered() {
        let mut runner = MockSignerRunner::new();
        runner
            .expect_get_epoch_settings()
            .once()
            .returning(|| Ok(Some(fake_data::epoch_settings())));
        runner
            .expect_get_current_beacon()
            .times(2)
            .returning(|| Ok(fake_data::beacon()));
        runner
            .expect_update_stake_distribution()
            .once()
            .returning(|_| Ok(()));
        runner
            .expect_register_signer_to_aggregator()
            .once()
            .returning(|_, _| Ok(()));

        let mut state_machine = init_state_machine(
            SignerState::Unregistered {
                epoch: fake_data::beacon().epoch,
            },
            runner,
        );

        state_machine
            .cycle()
            .await
            .expect("Cycling the state machine should not fail");

        if let SignerState::Registered { epoch: _ } = state_machine.get_state() {
        } else {
            panic!(
                "state machine did not return a RegisteredState but {:?}",
                state_machine.get_state()
            );
        }
    }

    #[tokio::test]
    async fn registered_to_unregistered() {
        let mut runner = MockSignerRunner::new();
        runner
            .expect_get_current_beacon()
            .once()
            .returning(|| Ok(fake_data::beacon()));
        runner
            .expect_update_era_checker()
            .once()
            .returning(|_e: Epoch| Ok(()));

        let mut state_machine =
            init_state_machine(SignerState::Registered { epoch: Epoch(0) }, runner);

        state_machine
            .cycle()
            .await
            .expect("Cycling the state machine should not fail");
        assert_eq!(
            &SignerState::Unregistered {
                epoch: fake_data::beacon().epoch
            },
            state_machine.get_state()
        );
    }

    #[tokio::test]
    async fn registered_to_registered() {
        let beacon = Beacon {
            immutable_file_number: 99,
            epoch: Epoch(9),
            ..Default::default()
        };
        let state = SignerState::Registered {
            epoch: beacon.epoch,
        };

        let mut certificate_pending = fake_data::certificate_pending();
        certificate_pending.beacon = beacon.clone();
        let mut runner = MockSignerRunner::new();
        runner
            .expect_get_current_beacon()
            .once()
            .returning(move || Ok(beacon.to_owned()));
        runner
            .expect_get_pending_certificate()
            .once()
            .returning(move || Ok(Some(certificate_pending.to_owned())));
        runner.expect_can_i_sign().once().returning(|_| Ok(false));

        let mut state_machine = init_state_machine(state, runner);
        state_machine
            .cycle()
            .await
            .expect("Cycling the state machine should not fail");

        assert_eq!(
            SignerState::Registered { epoch: Epoch(9) },
            *state_machine.get_state(),
            "state machine did not return a RegisteredState but {:?}",
            state_machine.get_state()
        );
    }

    #[tokio::test]
    async fn registered_to_signed() {
        let beacon = Beacon {
            immutable_file_number: 99,
            epoch: Epoch(9),
            ..Default::default()
        };
        let state = SignerState::Registered {
            epoch: beacon.epoch,
        };

        let mut certificate_pending = fake_data::certificate_pending();
        certificate_pending.beacon = beacon.clone();
        let signed_entity_type = certificate_pending.signed_entity_type.to_owned();
        let mut runner = MockSignerRunner::new();
        runner
            .expect_get_current_beacon()
            .once()
            .returning(move || Ok(beacon.clone()));
        runner
            .expect_get_pending_certificate()
            .once()
            .returning(move || Ok(Some(certificate_pending.clone())));
        runner.expect_can_i_sign().once().returning(|_| Ok(true));
        runner
            .expect_associate_signers_with_stake()
            .times(2)
            .returning(|_, _| Ok(fake_data::signers_with_stakes(4)));
        runner
            .expect_compute_single_signature()
            .once()
            .returning(|_, _, _| Ok(Some(fake_data::single_signatures(vec![1, 5, 23]))));
        runner
            .expect_compute_message()
            .once()
            .returning(|_, _| Ok(ProtocolMessage::new()));
        runner
            .expect_send_single_signature()
            .once()
            .returning(|_, _| Ok(()));

        let mut state_machine = init_state_machine(state, runner);
        state_machine
            .cycle()
            .await
            .expect("Cycling the state machine should not fail");

        assert_eq!(
            SignerState::Signed {
                epoch: Epoch(9),
                signed_entity_type
            },
            *state_machine.get_state(),
            "state machine did not return a RegisteredState but {:?}",
            state_machine.get_state()
        );
    }

    #[tokio::test]
    async fn signed_to_registered() {
        let beacon = Beacon {
            immutable_file_number: 99,
            epoch: Epoch(9),
            ..Default::default()
        };
        let beacon_clone = beacon.clone();
        let state = SignerState::Signed {
            epoch: beacon.epoch,
            signed_entity_type: SignedEntityType::CardanoImmutableFilesFull(beacon.clone()),
        };

        let mut certificate_pending = fake_data::certificate_pending();
        certificate_pending.beacon = beacon.clone();
        certificate_pending.signed_entity_type =
            SignedEntityType::MithrilStakeDistribution(Epoch(10));

        let mut runner = MockSignerRunner::new();
        runner
            .expect_get_current_beacon()
            .times(1)
            .returning(move || Ok(beacon_clone.to_owned()));
        runner
            .expect_get_pending_certificate()
            .once()
            .returning(move || Ok(Some(certificate_pending.clone())));

        let mut state_machine = init_state_machine(state, runner);
        state_machine
            .cycle()
            .await
            .expect("Cycling the state machine should not fail");

        assert_eq!(
            SignerState::Registered {
                epoch: beacon.epoch
            },
            *state_machine.get_state()
        );
    }

    #[tokio::test]
    async fn signed_to_unregistered() {
        let beacon = Beacon {
            immutable_file_number: 99,
            epoch: Epoch(9),
            ..Default::default()
        };
        let new_beacon = Beacon {
            epoch: Epoch(10),
            ..beacon.clone()
        };
        let state = SignerState::Signed {
            epoch: beacon.epoch,
            signed_entity_type: SignedEntityType::dummy(),
        };

        let mut runner = MockSignerRunner::new();
        runner
            .expect_get_current_beacon()
            .once()
            .returning(move || Ok(new_beacon.to_owned()));
        runner
            .expect_update_era_checker()
            .once()
            .returning(|_e: Epoch| Ok(()));

        let mut state_machine = init_state_machine(state, runner);
        state_machine
            .cycle()
            .await
            .expect("Cycling the state machine should not fail");

        assert_eq!(
            SignerState::Unregistered { epoch: Epoch(10) },
            *state_machine.get_state()
        );
    }

    #[tokio::test]
    async fn signed_to_signed_no_pending_certificate() {
        let beacon = Beacon {
            immutable_file_number: 99,
            epoch: Epoch(9),
            ..Default::default()
        };
        let beacon_clone = beacon.clone();
        let state = SignerState::Signed {
            epoch: beacon.epoch,
            signed_entity_type: SignedEntityType::dummy(),
        };

        let mut certificate_pending = fake_data::certificate_pending();
        certificate_pending.beacon = beacon.clone();

        let mut runner = MockSignerRunner::new();
        runner
            .expect_get_current_beacon()
            .once()
            .returning(move || Ok(beacon_clone.to_owned()));
        runner
            .expect_get_pending_certificate()
            .once()
            .returning(move || Ok(None));

        let mut state_machine = init_state_machine(state, runner);
        state_machine
            .cycle()
            .await
            .expect("Cycling the state machine should not fail");

        assert_eq!(
            SignerState::Signed {
                epoch: beacon.epoch,
                signed_entity_type: SignedEntityType::dummy(),
            },
            *state_machine.get_state()
        );
    }

    #[tokio::test]
    async fn signed_to_signed_unsigned_pending_certificate() {
        let beacon = Beacon {
            immutable_file_number: 99,
            epoch: Epoch(9),
            ..Default::default()
        };
        let beacon_clone = beacon.clone();
        let state = SignerState::Signed {
            epoch: beacon.epoch,
            signed_entity_type: SignedEntityType::dummy(),
        };

        let mut certificate_pending = fake_data::certificate_pending();
        certificate_pending.beacon = beacon.clone();

        let mut runner = MockSignerRunner::new();
        runner
            .expect_get_current_beacon()
            .once()
            .returning(move || Ok(beacon_clone.to_owned()));
        runner
            .expect_get_pending_certificate()
            .once()
            .returning(move || Ok(Some(certificate_pending.clone())));

        let mut state_machine = init_state_machine(state, runner);
        state_machine
            .cycle()
            .await
            .expect("Cycling the state machine should not fail");

        assert_eq!(
            SignerState::Signed {
                epoch: beacon.epoch,
                signed_entity_type: SignedEntityType::dummy(),
            },
            *state_machine.get_state()
        );
    }
}
