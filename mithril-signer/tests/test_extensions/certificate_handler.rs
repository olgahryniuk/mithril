use std::{collections::HashMap, sync::Arc};

use async_trait::async_trait;
use mithril_common::{
    entities::{
        Beacon, CertificatePending, Epoch, EpochSettings, SignedEntityType, Signer,
        SingleSignatures,
    },
    test_utils::fake_data,
    BeaconProvider, BeaconProviderImpl,
};
use mithril_signer::{AggregatorClient, AggregatorClientError};
use tokio::sync::RwLock;

pub struct FakeAggregator {
    registered_signers: RwLock<HashMap<Epoch, Vec<Signer>>>,
    beacon_provider: Arc<BeaconProviderImpl>,
    withhold_epoch_settings: RwLock<bool>,
}

impl FakeAggregator {
    pub fn new(beacon_provider: Arc<BeaconProviderImpl>) -> Self {
        Self {
            withhold_epoch_settings: RwLock::new(true),
            registered_signers: RwLock::new(HashMap::new()),
            beacon_provider,
        }
    }

    pub async fn get_registered_signers(&self, epoch: &Epoch) -> Option<Vec<Signer>> {
        let store = self.registered_signers.read().await;

        store.get(epoch).cloned()
    }

    pub async fn release_epoch_settings(&self) {
        let mut settings = self.withhold_epoch_settings.write().await;
        *settings = false;
    }

    async fn get_beacon(&self) -> Result<Beacon, AggregatorClientError> {
        let beacon = self
            .beacon_provider
            .get_current_beacon()
            .await
            .map_err(|e| AggregatorClientError::RemoteServerTechnical(e.to_string()))?;

        Ok(beacon)
    }
}

#[async_trait]
impl AggregatorClient for FakeAggregator {
    async fn retrieve_epoch_settings(
        &self,
    ) -> Result<Option<EpochSettings>, AggregatorClientError> {
        if *self.withhold_epoch_settings.read().await {
            Ok(None)
        } else {
            let beacon = self.get_beacon().await?;
            Ok(Some(EpochSettings {
                epoch: beacon.epoch,
                ..Default::default()
            }))
        }
    }

    async fn retrieve_pending_certificate(
        &self,
    ) -> Result<Option<CertificatePending>, AggregatorClientError> {
        let store = self.registered_signers.read().await;

        if store.is_empty() {
            return Ok(None);
        }
        let beacon = self.get_beacon().await?;
        let mut certificate_pending = CertificatePending {
            beacon: beacon.clone(),
            signed_entity_type: SignedEntityType::CardanoImmutableFilesFull(beacon.clone()),
            ..fake_data::certificate_pending()
        };

        let store = self.registered_signers.read().await;
        certificate_pending.signers = store
            .get(&beacon.epoch.offset_to_signer_retrieval_epoch().unwrap())
            .cloned()
            .unwrap_or_default();
        certificate_pending.next_signers = store
            .get(&beacon.epoch.offset_to_next_signer_retrieval_epoch())
            .cloned()
            .unwrap_or_default();

        Ok(Some(certificate_pending))
    }

    /// Registers signer with the aggregator
    async fn register_signer(
        &self,
        epoch: Epoch,
        signer: &Signer,
    ) -> Result<(), AggregatorClientError> {
        let mut store = self.registered_signers.write().await;
        let mut signers = store.get(&epoch).cloned().unwrap_or_default();
        signers.push(signer.clone());
        let _ = store.insert(epoch, signers);

        Ok(())
    }

    /// Registers single signatures with the aggregator
    async fn register_signatures(
        &self,
        _signed_entity_type: &SignedEntityType,
        _signatures: &SingleSignatures,
    ) -> Result<(), AggregatorClientError> {
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use mithril_common::{
        chain_observer::ChainObserver, chain_observer::FakeObserver,
        digesters::DumbImmutableFileObserver, test_utils::fake_data, CardanoNetwork,
    };

    use super::*;

    async fn init() -> (Arc<FakeObserver>, FakeAggregator) {
        let immutable_observer = Arc::new(DumbImmutableFileObserver::new());
        immutable_observer.shall_return(Some(1)).await;
        let chain_observer = Arc::new(FakeObserver::new(Some(Beacon {
            epoch: Epoch(1),
            immutable_file_number: 1,
            network: "devnet".to_string(),
        })));
        let beacon_provider = Arc::new(BeaconProviderImpl::new(
            chain_observer.clone(),
            immutable_observer.clone(),
            CardanoNetwork::DevNet(42),
        ));

        (chain_observer, FakeAggregator::new(beacon_provider))
    }

    #[tokio::test]
    async fn register_signer() {
        let (chain_observer, fake_aggregator) = init().await;
        let fake_signers = fake_data::signers(2);
        let epoch = chain_observer.get_current_epoch().await.unwrap().unwrap();
        let registration_epoch = Epoch(2);
        assert_eq!(2, fake_signers.len());

        fake_aggregator
            .register_signer(
                epoch.offset_to_recording_epoch(),
                &fake_signers.as_slice()[0],
            )
            .await
            .expect("aggregator client should not fail while registering a user");
        let signers = fake_aggregator
            .get_registered_signers(&registration_epoch)
            .await
            .expect("we should have a result, None found!");

        assert_eq!(1, signers.len());

        fake_aggregator
            .register_signer(
                epoch.offset_to_recording_epoch(),
                &fake_signers.as_slice()[1],
            )
            .await
            .expect("aggregator client should not fail while registering a user");
        let signers = fake_aggregator
            .get_registered_signers(&registration_epoch)
            .await
            .expect("we should have a result, None found!");

        assert_eq!(2, signers.len());
    }

    #[tokio::test]
    async fn retrieve_pending_certificate() {
        let (chain_observer, fake_aggregator) = init().await;
        let epoch = chain_observer.get_current_epoch().await.unwrap().unwrap();
        let cert = fake_aggregator
            .retrieve_pending_certificate()
            .await
            .expect("retrieving a certificate pending should not raise an error");

        assert!(
            cert.is_none(),
            "aggregator client is empty => no pending certificate"
        );

        for signer in fake_data::signers(3) {
            fake_aggregator
                .register_signer(epoch.offset_to_recording_epoch(), &signer)
                .await
                .unwrap();
        }

        let cert = fake_aggregator
            .retrieve_pending_certificate()
            .await
            .expect("retrieving a certificate pending should not raise an error")
            .expect("we should get a pending certificate");

        assert_eq!(0, cert.signers.len());
        assert_eq!(0, cert.next_signers.len());
        assert_eq!(1, cert.beacon.epoch);

        let epoch = chain_observer.next_epoch().await.unwrap();

        let cert = fake_aggregator
            .retrieve_pending_certificate()
            .await
            .expect("retrieving a certificate pending should not raise an error")
            .expect("we should get a pending certificate");

        assert_eq!(0, cert.signers.len());
        assert_eq!(3, cert.next_signers.len());
        assert_eq!(2, cert.beacon.epoch);

        for signer in fake_data::signers(2) {
            fake_aggregator
                .register_signer(epoch.offset_to_recording_epoch(), &signer)
                .await
                .unwrap();
        }

        chain_observer.next_epoch().await;

        let cert = fake_aggregator
            .retrieve_pending_certificate()
            .await
            .expect("retrieving a certificate pending should not raise an error")
            .expect("we should get a pending certificate");

        assert_eq!(3, cert.signers.len());
        assert_eq!(2, cert.next_signers.len());
        assert_eq!(3, cert.beacon.epoch);
    }
}
