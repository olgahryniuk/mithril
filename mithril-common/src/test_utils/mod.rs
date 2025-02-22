//! Test utilities
//!
//! They contains:
//! * A Open Api Spec tester
//! * Some precomputed fake data
//! * A builder of [MithrilFixture] to generate signers alongside a stake distribution
//!

pub mod apispec;
pub mod fake_data;
mod fixture_builder;
mod mithril_fixture;

pub use fixture_builder::{MithrilFixtureBuilder, StakeDistributionGenerationMethod};
pub use mithril_fixture::{MithrilFixture, SignerFixture};
