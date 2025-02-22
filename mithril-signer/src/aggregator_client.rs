use async_trait::async_trait;
use reqwest::{self, Client, Proxy, RequestBuilder, Response, StatusCode};
use slog_scope::debug;
use std::{io, sync::Arc};
use thiserror::Error;

use mithril_common::{
    api_version::APIVersionProvider,
    entities::{
        CertificatePending, Epoch, EpochSettings, SignedEntityType, Signer, SingleSignatures,
    },
    messages::{
        CertificatePendingMessage, EpochSettingsMessage, FromMessageAdapter, ToMessageAdapter,
    },
    MITHRIL_API_VERSION_HEADER, MITHRIL_SIGNER_VERSION_HEADER,
};

#[cfg(test)]
use mockall::automock;

use crate::message_adapters::{
    FromEpochSettingsAdapter, FromPendingCertificateMessageAdapter,
    ToRegisterSignatureMessageAdapter, ToRegisterSignerMessageAdapter,
};

/// Error structure for the Aggregator Client.
#[derive(Error, Debug)]
pub enum AggregatorClientError {
    /// The aggregator host has returned a technical error.
    #[error("remote server technical error: '{0}'")]
    RemoteServerTechnical(String),

    /// The aggregator host responded it cannot fulfill our request.
    #[error("remote server logical error: '{0}'")]
    RemoteServerLogical(String),

    /// Could not reach aggregator.
    #[error("remote server unreachable: '{0}'")]
    RemoteServerUnreachable(String),

    /// Could not parse response.
    #[error("json parsing failed: '{0}'")]
    JsonParseFailed(String),

    /// Mostly network errors.
    #[error("io error: {0}")]
    IOError(#[from] io::Error),

    /// Incompatible API version error
    #[error("HTTP API version mismatch: {0}")]
    ApiVersionMismatch(String),

    /// HTTP client creation error
    #[error("HTTP client creation failed: {0}")]
    HTTPClientCreation(String),

    /// Proxy creation error
    #[error("proxy creation failed: {0}")]
    ProxyCreation(String),
}

#[cfg(test)]
/// convenient methods to error enum
impl AggregatorClientError {
    pub fn is_api_version_mismatch(&self) -> bool {
        matches!(self, Self::ApiVersionMismatch(_))
    }
}

/// Trait for mocking and testing a `AggregatorClient`
#[cfg_attr(test, automock)]
#[async_trait]
pub trait AggregatorClient: Sync + Send {
    /// Retrieves epoch settings from the aggregator
    async fn retrieve_epoch_settings(&self)
        -> Result<Option<EpochSettings>, AggregatorClientError>;

    /// Retrieves a pending certificate from the aggregator
    async fn retrieve_pending_certificate(
        &self,
    ) -> Result<Option<CertificatePending>, AggregatorClientError>;

    /// Registers signer with the aggregator.
    async fn register_signer(
        &self,
        epoch: Epoch,
        signer: &Signer,
    ) -> Result<(), AggregatorClientError>;

    /// Registers single signatures with the aggregator.
    async fn register_signatures(
        &self,
        signed_entity_type: &SignedEntityType,
        signatures: &SingleSignatures,
    ) -> Result<(), AggregatorClientError>;
}

/// AggregatorHTTPClient is a http client for an aggregator
pub struct AggregatorHTTPClient {
    aggregator_endpoint: String,
    relay_endpoint: Option<String>,
    api_version_provider: Arc<APIVersionProvider>,
}

impl AggregatorHTTPClient {
    /// AggregatorHTTPClient factory
    pub fn new(
        aggregator_endpoint: String,
        relay_endpoint: Option<String>,
        api_version_provider: Arc<APIVersionProvider>,
    ) -> Self {
        debug!("New AggregatorHTTPClient created");
        Self {
            aggregator_endpoint,
            relay_endpoint,
            api_version_provider,
        }
    }

    fn prepare_http_client(&self) -> Result<Client, AggregatorClientError> {
        let client = match &self.relay_endpoint {
            Some(relay_endpoint) => Client::builder()
                .proxy(
                    Proxy::all(relay_endpoint)
                        .map_err(|e| AggregatorClientError::ProxyCreation(e.to_string()))?,
                )
                .build()
                .map_err(|e| AggregatorClientError::HTTPClientCreation(e.to_string()))?,
            None => Client::new(),
        };

        Ok(client)
    }

    /// Forge a client request adding protocol version in the headers.
    pub fn prepare_request_builder(&self, request_builder: RequestBuilder) -> RequestBuilder {
        request_builder
            .header(
                MITHRIL_API_VERSION_HEADER,
                self.api_version_provider
                    .compute_current_version()
                    .unwrap()
                    .to_string(),
            )
            .header(MITHRIL_SIGNER_VERSION_HEADER, env!("CARGO_PKG_VERSION"))
    }

    /// API version error handling
    fn handle_api_error(&self, response: &Response) -> AggregatorClientError {
        if let Some(version) = response.headers().get(MITHRIL_API_VERSION_HEADER) {
            AggregatorClientError::ApiVersionMismatch(format!(
                "server version: '{}', signer version: '{}'",
                version.to_str().unwrap(),
                self.api_version_provider.compute_current_version().unwrap()
            ))
        } else {
            AggregatorClientError::ApiVersionMismatch(format!(
                "version precondition failed, sent version '{}'.",
                self.api_version_provider.compute_current_version().unwrap()
            ))
        }
    }
}

#[async_trait]
impl AggregatorClient for AggregatorHTTPClient {
    async fn retrieve_epoch_settings(
        &self,
    ) -> Result<Option<EpochSettings>, AggregatorClientError> {
        debug!("Retrieve epoch settings");
        let url = format!("{}/epoch-settings", self.aggregator_endpoint);
        let response = self
            .prepare_request_builder(self.prepare_http_client()?.get(url.clone()))
            .send()
            .await;

        match response {
            Ok(response) => match response.status() {
                StatusCode::OK => match response.json::<EpochSettingsMessage>().await {
                    Ok(message) => Ok(Some(FromEpochSettingsAdapter::adapt(message))),
                    Err(err) => Err(AggregatorClientError::JsonParseFailed(err.to_string())),
                },
                StatusCode::PRECONDITION_FAILED => Err(self.handle_api_error(&response)),
                _ => Err(AggregatorClientError::RemoteServerTechnical(
                    response.text().await.unwrap_or_default(),
                )),
            },
            Err(err) => Err(AggregatorClientError::RemoteServerUnreachable(
                err.to_string(),
            )),
        }
    }

    async fn retrieve_pending_certificate(
        &self,
    ) -> Result<Option<CertificatePending>, AggregatorClientError> {
        debug!("Retrieve pending certificate");
        let url = format!("{}/certificate-pending", self.aggregator_endpoint);
        let response = self
            .prepare_request_builder(self.prepare_http_client()?.get(url.clone()))
            .send()
            .await;

        match response {
            Ok(response) => match response.status() {
                StatusCode::OK => match response.json::<CertificatePendingMessage>().await {
                    Ok(message) => Ok(Some(FromPendingCertificateMessageAdapter::adapt(message))),
                    Err(err) => Err(AggregatorClientError::JsonParseFailed(err.to_string())),
                },
                StatusCode::PRECONDITION_FAILED => Err(self.handle_api_error(&response)),
                StatusCode::NO_CONTENT => Ok(None),
                _ => Err(AggregatorClientError::RemoteServerTechnical(
                    response.text().await.unwrap_or_default(),
                )),
            },
            Err(err) => Err(AggregatorClientError::RemoteServerUnreachable(
                err.to_string(),
            )),
        }
    }

    async fn register_signer(
        &self,
        epoch: Epoch,
        signer: &Signer,
    ) -> Result<(), AggregatorClientError> {
        debug!("Register signer");
        let url = format!("{}/register-signer", self.aggregator_endpoint);
        let register_signer_message =
            ToRegisterSignerMessageAdapter::adapt((epoch, signer.to_owned()));
        let response = self
            .prepare_request_builder(self.prepare_http_client()?.post(url.clone()))
            .json(&register_signer_message)
            .send()
            .await;

        match response {
            Ok(response) => match response.status() {
                StatusCode::CREATED => Ok(()),
                StatusCode::PRECONDITION_FAILED => Err(self.handle_api_error(&response)),
                StatusCode::BAD_REQUEST => Err(AggregatorClientError::RemoteServerLogical(
                    format!("bad request: {}", response.text().await.unwrap_or_default()),
                )),
                _ => Err(AggregatorClientError::RemoteServerTechnical(
                    response.text().await.unwrap_or_default(),
                )),
            },
            Err(err) => Err(AggregatorClientError::RemoteServerUnreachable(
                err.to_string(),
            )),
        }
    }

    async fn register_signatures(
        &self,
        signed_entity_type: &SignedEntityType,
        signatures: &SingleSignatures,
    ) -> Result<(), AggregatorClientError> {
        debug!("Register signatures");
        let url = format!("{}/register-signatures", self.aggregator_endpoint);
        let register_single_signature_message = ToRegisterSignatureMessageAdapter::adapt((
            signed_entity_type.to_owned(),
            signatures.to_owned(),
        ));
        let response = self
            .prepare_request_builder(self.prepare_http_client()?.post(url.clone()))
            .json(&register_single_signature_message)
            .send()
            .await;

        match response {
            Ok(response) => match response.status() {
                StatusCode::CREATED => Ok(()),
                StatusCode::PRECONDITION_FAILED => Err(self.handle_api_error(&response)),
                StatusCode::BAD_REQUEST => Err(AggregatorClientError::RemoteServerLogical(
                    format!("bad request: {}", response.text().await.unwrap_or_default()),
                )),
                StatusCode::CONFLICT => Err(AggregatorClientError::RemoteServerLogical(
                    "already registered single signatures".to_string(),
                )),
                _ => Err(AggregatorClientError::RemoteServerTechnical(
                    response.text().await.unwrap_or_default(),
                )),
            },
            Err(err) => Err(AggregatorClientError::RemoteServerUnreachable(
                err.to_string(),
            )),
        }
    }
}

#[cfg(test)]
pub(crate) mod dumb {
    use super::*;
    use mithril_common::test_utils::fake_data;
    use tokio::sync::RwLock;

    /// This aggregator client is intended to be used by test services.
    /// It actually does not communicate with an aggregator host but mimics this behavior.
    /// It is driven by a Tester that controls the CertificatePending it can return and it can return its internal state for testing.
    pub struct DumbAggregatorClient {
        epoch_settings: RwLock<Option<EpochSettings>>,
        certificate_pending: RwLock<Option<CertificatePending>>,
        last_registered_signer: RwLock<Option<Signer>>,
    }

    impl DumbAggregatorClient {
        /// Instanciate a new DumbCertificateHandler.
        pub fn new() -> Self {
            Self {
                epoch_settings: RwLock::new(None),
                certificate_pending: RwLock::new(None),
                last_registered_signer: RwLock::new(None),
            }
        }

        /// this method pilots the epoch settings handler
        pub async fn set_epoch_settings(&self, epoch_settings: Option<EpochSettings>) {
            let mut epoch_settings_writer = self.epoch_settings.write().await;
            *epoch_settings_writer = epoch_settings;
        }

        /// this method pilots the certificate pending handler
        /// calling this method unsets the last registered signer
        pub async fn set_certificate_pending(
            &self,
            certificate_pending: Option<CertificatePending>,
        ) {
            let mut cert = self.certificate_pending.write().await;
            *cert = certificate_pending;
            let mut signer = self.last_registered_signer.write().await;
            *signer = None;
        }

        /// Return the last signer that called with the `register` method.
        pub async fn get_last_registered_signer(&self) -> Option<Signer> {
            self.last_registered_signer.read().await.clone()
        }
    }

    impl Default for DumbAggregatorClient {
        fn default() -> Self {
            Self {
                epoch_settings: RwLock::new(Some(fake_data::epoch_settings())),
                certificate_pending: RwLock::new(Some(fake_data::certificate_pending())),
                last_registered_signer: RwLock::new(None),
            }
        }
    }

    #[async_trait]
    impl AggregatorClient for DumbAggregatorClient {
        async fn retrieve_epoch_settings(
            &self,
        ) -> Result<Option<EpochSettings>, AggregatorClientError> {
            let epoch_settings = self.epoch_settings.read().await.clone();

            Ok(epoch_settings)
        }

        async fn retrieve_pending_certificate(
            &self,
        ) -> Result<Option<CertificatePending>, AggregatorClientError> {
            let cert = self.certificate_pending.read().await.clone();

            Ok(cert)
        }

        /// Registers signer with the aggregator
        async fn register_signer(
            &self,
            _epoch: Epoch,
            signer: &Signer,
        ) -> Result<(), AggregatorClientError> {
            let mut last_registered_signer = self.last_registered_signer.write().await;
            let signer = signer.clone();
            *last_registered_signer = Some(signer);

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
}

#[cfg(test)]
mod tests {
    use super::*;
    use httpmock::prelude::*;
    use mithril_common::entities::{ClientError, Epoch};
    use mithril_common::era::{EraChecker, SupportedEra};
    use serde_json::json;
    use std::path::{Path, PathBuf};

    use crate::configuration::Configuration;
    use mithril_common::era::adapters::EraReaderAdapterType;
    use mithril_common::test_utils::fake_data;

    fn setup_test() -> (MockServer, Configuration, APIVersionProvider) {
        let server = MockServer::start();
        let config = Configuration {
            cardano_cli_path: PathBuf::new().join("cardano-cli"),
            cardano_node_socket_path: PathBuf::new().join("whatever"),
            network_magic: Some(42),
            network: "testnet".to_string(),
            aggregator_endpoint: server.url(""),
            relay_endpoint: None,
            party_id: Some("0".to_string()),
            run_interval: 100,
            db_directory: Path::new("./db").to_path_buf(),
            data_stores_directory: Path::new("./stores").to_path_buf(),
            store_retention_limit: None,
            kes_secret_key_path: None,
            operational_certificate_path: None,
            disable_digests_cache: false,
            reset_digests_cache: false,
            era_reader_adapter_type: EraReaderAdapterType::Bootstrap,
            era_reader_adapter_params: None,
        };
        let era_checker = EraChecker::new(SupportedEra::dummy(), Epoch(1));
        let api_version_provider = APIVersionProvider::new(Arc::new(era_checker));
        (server, config, api_version_provider)
    }

    #[tokio::test]
    async fn test_epoch_settings_ok_200() {
        let (server, config, api_version_provider) = setup_test();
        let epoch_settings_expected = EpochSettingsMessage::dummy();
        let _snapshots_mock = server.mock(|when, then| {
            when.path("/epoch-settings");
            then.status(200)
                .body(json!(epoch_settings_expected).to_string());
        });
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let epoch_settings = certificate_handler.retrieve_epoch_settings().await;
        epoch_settings.as_ref().expect("unexpected error");
        assert_eq!(
            FromEpochSettingsAdapter::adapt(epoch_settings_expected),
            epoch_settings.unwrap().unwrap()
        );
    }

    #[tokio::test]
    async fn test_epoch_settings_ko_412() {
        let (server, config, api_version_provider) = setup_test();
        let _snapshots_mock = server.mock(|when, then| {
            when.path("/epoch-settings");
            then.status(412)
                .header(MITHRIL_API_VERSION_HEADER, "0.0.999");
        });
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let epoch_settings = certificate_handler
            .retrieve_epoch_settings()
            .await
            .unwrap_err();

        assert!(epoch_settings.is_api_version_mismatch());
    }

    #[tokio::test]
    async fn test_epoch_settings_ko_500() {
        let (server, config, api_version_provider) = setup_test();
        let _snapshots_mock = server.mock(|when, then| {
            when.path("/epoch-settings");
            then.status(500).body("an error occurred");
        });
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let epoch_settings = certificate_handler.retrieve_epoch_settings().await;
        assert_eq!(
            AggregatorClientError::RemoteServerTechnical("an error occurred".to_string())
                .to_string(),
            epoch_settings.unwrap_err().to_string()
        );
    }

    #[tokio::test]
    async fn test_certificate_pending_ok_200() {
        let (server, config, api_version_provider) = setup_test();
        let pending_certificate_expected = CertificatePendingMessage::dummy();
        let _snapshots_mock = server.mock(|when, then| {
            when.path("/certificate-pending");
            then.status(200)
                .body(json!(pending_certificate_expected).to_string());
        });
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let pending_certificate = certificate_handler.retrieve_pending_certificate().await;
        pending_certificate.as_ref().expect("unexpected error");
        assert_eq!(
            FromPendingCertificateMessageAdapter::adapt(pending_certificate_expected),
            pending_certificate.unwrap().unwrap()
        );
    }

    #[tokio::test]
    async fn test_certificate_pending_ko_412() {
        let (server, config, api_version_provider) = setup_test();
        let _snapshots_mock = server.mock(|when, then| {
            when.path("/certificate-pending");
            then.status(412)
                .header(MITHRIL_API_VERSION_HEADER, "0.0.999");
        });
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let error = certificate_handler
            .retrieve_pending_certificate()
            .await
            .unwrap_err();

        assert!(error.is_api_version_mismatch());
    }

    #[tokio::test]
    async fn test_certificate_pending_ok_204() {
        let (server, config, api_version_provider) = setup_test();
        let _snapshots_mock = server.mock(|when, then| {
            when.path("/certificate-pending");
            then.status(204);
        });
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let pending_certificate = certificate_handler.retrieve_pending_certificate().await;
        assert!(pending_certificate.expect("unexpected error").is_none());
    }

    #[tokio::test]
    async fn test_certificate_pending_ko_500() {
        let (server, config, api_version_provider) = setup_test();
        let _snapshots_mock = server.mock(|when, then| {
            when.path("/certificate-pending");
            then.status(500).body("an error occurred");
        });
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let pending_certificate = certificate_handler.retrieve_pending_certificate().await;
        assert_eq!(
            AggregatorClientError::RemoteServerTechnical("an error occurred".to_string())
                .to_string(),
            pending_certificate.unwrap_err().to_string()
        );
    }

    #[tokio::test]
    async fn test_register_signer_ok_201() {
        let epoch = Epoch(1);
        let single_signers = fake_data::signers(1);
        let single_signer = single_signers.first().unwrap();
        let (server, config, api_version_provider) = setup_test();
        let _snapshots_mock = server.mock(|when, then| {
            when.method(POST).path("/register-signer");
            then.status(201);
        });
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let register_signer = certificate_handler
            .register_signer(epoch, single_signer)
            .await;
        register_signer.expect("unexpected error");
    }

    #[tokio::test]
    async fn test_register_signer_ko_412() {
        let epoch = Epoch(1);
        let (server, config, api_version_provider) = setup_test();
        let _snapshots_mock = server.mock(|when, then| {
            when.method(POST).path("/register-signer");
            then.status(412)
                .header(MITHRIL_API_VERSION_HEADER, "0.0.999");
        });
        let single_signers = fake_data::signers(1);
        let single_signer = single_signers.first().unwrap();
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let error = certificate_handler
            .register_signer(epoch, single_signer)
            .await
            .unwrap_err();

        assert!(error.is_api_version_mismatch());
    }

    #[tokio::test]
    async fn test_register_signer_ko_400() {
        let epoch = Epoch(1);
        let single_signers = fake_data::signers(1);
        let single_signer = single_signers.first().unwrap();
        let (server, config, api_version_provider) = setup_test();
        let _snapshots_mock = server.mock(|when, then| {
            when.method(POST).path("/register-signer");
            then.status(400).body(
                serde_json::to_vec(&ClientError::new(
                    "error".to_string(),
                    "an error".to_string(),
                ))
                .unwrap(),
            );
        });
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let register_signer = certificate_handler
            .register_signer(epoch, single_signer)
            .await;
        assert_eq!(
            AggregatorClientError::RemoteServerLogical(
                "bad request: {\"label\":\"error\",\"message\":\"an error\"}".to_string()
            )
            .to_string(),
            register_signer.unwrap_err().to_string()
        );
    }

    #[tokio::test]
    async fn test_register_signer_ko_500() {
        let epoch = Epoch(1);
        let single_signers = fake_data::signers(1);
        let single_signer = single_signers.first().unwrap();
        let (server, config, api_version_provider) = setup_test();
        let _snapshots_mock = server.mock(|when, then| {
            when.method(POST).path("/register-signer");
            then.status(500).body("an error occurred");
        });
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let register_signer = certificate_handler
            .register_signer(epoch, single_signer)
            .await;
        assert_eq!(
            AggregatorClientError::RemoteServerTechnical("an error occurred".to_string())
                .to_string(),
            register_signer.unwrap_err().to_string()
        );
    }

    #[tokio::test]
    async fn test_register_signatures_ok_201() {
        let single_signatures = fake_data::single_signatures((1..5).collect());
        let (server, config, api_version_provider) = setup_test();
        let _snapshots_mock = server.mock(|when, then| {
            when.method(POST).path("/register-signatures");
            then.status(201);
        });
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let register_signatures = certificate_handler
            .register_signatures(&SignedEntityType::dummy(), &single_signatures)
            .await;
        register_signatures.expect("unexpected error");
    }

    #[tokio::test]
    async fn test_register_signatures_ko_412() {
        let (server, config, api_version_provider) = setup_test();
        let _snapshots_mock = server.mock(|when, then| {
            when.method(POST).path("/register-signatures");
            then.status(412)
                .header(MITHRIL_API_VERSION_HEADER, "0.0.999");
        });
        let single_signatures = fake_data::single_signatures((1..5).collect());
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let error = certificate_handler
            .register_signatures(&SignedEntityType::dummy(), &single_signatures)
            .await
            .unwrap_err();

        assert!(error.is_api_version_mismatch());
    }

    #[tokio::test]
    async fn test_register_signatures_ko_400() {
        let single_signatures = fake_data::single_signatures((1..5).collect());
        let (server, config, api_version_provider) = setup_test();
        let _snapshots_mock = server.mock(|when, then| {
            when.method(POST).path("/register-signatures");
            then.status(400).body(
                serde_json::to_vec(&ClientError::new(
                    "error".to_string(),
                    "an error".to_string(),
                ))
                .unwrap(),
            );
        });
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let register_signatures = certificate_handler
            .register_signatures(&SignedEntityType::dummy(), &single_signatures)
            .await;
        assert_eq!(
            AggregatorClientError::RemoteServerLogical(
                "bad request: {\"label\":\"error\",\"message\":\"an error\"}".to_string()
            )
            .to_string(),
            register_signatures.unwrap_err().to_string()
        );
    }

    #[tokio::test]
    async fn test_register_signatures_ko_409() {
        let single_signatures = fake_data::single_signatures((1..5).collect());
        let (server, config, api_version_provider) = setup_test();
        let _snapshots_mock = server.mock(|when, then| {
            when.method(POST).path("/register-signatures");
            then.status(409);
        });
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let register_signatures = certificate_handler
            .register_signatures(&SignedEntityType::dummy(), &single_signatures)
            .await;
        assert_eq!(
            AggregatorClientError::RemoteServerLogical(
                "already registered single signatures".to_string()
            )
            .to_string(),
            register_signatures.unwrap_err().to_string()
        );
    }

    #[tokio::test]
    async fn test_register_signatures_ko_500() {
        let single_signatures = fake_data::single_signatures((1..5).collect());
        let (server, config, api_version_provider) = setup_test();
        let _snapshots_mock = server.mock(|when, then| {
            when.method(POST).path("/register-signatures");
            then.status(500).body("an error occurred");
        });
        let certificate_handler = AggregatorHTTPClient::new(
            config.aggregator_endpoint,
            config.relay_endpoint,
            Arc::new(api_version_provider),
        );
        let register_signatures = certificate_handler
            .register_signatures(&SignedEntityType::dummy(), &single_signatures)
            .await;
        assert_eq!(
            AggregatorClientError::RemoteServerTechnical("an error occurred".to_string())
                .to_string(),
            register_signatures.unwrap_err().to_string()
        );
    }
}
