(function() {var implementors = {};
implementors["ark_crypto_primitives"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"enum\" href=\"ark_crypto_primitives/enum.CryptoError.html\" title=\"enum ark_crypto_primitives::CryptoError\">CryptoError</a>","synthetic":false,"types":["ark_crypto_primitives::CryptoError"]}];
implementors["ark_relations"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"enum\" href=\"ark_relations/r1cs/enum.SynthesisError.html\" title=\"enum ark_relations::r1cs::SynthesisError\">SynthesisError</a>","synthetic":false,"types":["ark_relations::r1cs::error::SynthesisError"]}];
implementors["ark_serialize"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"enum\" href=\"ark_serialize/enum.SerializationError.html\" title=\"enum ark_serialize::SerializationError\">SerializationError</a>","synthetic":false,"types":["ark_serialize::error::SerializationError"]}];
implementors["crypto_mac"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"crypto_mac/struct.MacError.html\" title=\"struct crypto_mac::MacError\">MacError</a>","synthetic":false,"types":["crypto_mac::errors::MacError"]},{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"crypto_mac/struct.InvalidKeyLength.html\" title=\"struct crypto_mac::InvalidKeyLength\">InvalidKeyLength</a>","synthetic":false,"types":["crypto_mac::errors::InvalidKeyLength"]}];
implementors["digest"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"digest/struct.InvalidOutputSize.html\" title=\"struct digest::InvalidOutputSize\">InvalidOutputSize</a>","synthetic":false,"types":["digest::errors::InvalidOutputSize"]}];
implementors["getrandom"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"getrandom/struct.Error.html\" title=\"struct getrandom::Error\">Error</a>","synthetic":false,"types":["getrandom::error::Error"]}];
implementors["mithril"] = [{"text":"impl&lt;A, F, H&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"enum\" href=\"mithril/atms/enum.AtmsError.html\" title=\"enum mithril::atms::AtmsError\">AtmsError</a>&lt;A, F, H&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;A: <a class=\"trait\" href=\"mithril/atms/trait.Atms.html\" title=\"trait mithril::atms::Atms\">Atms</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;H: <a class=\"trait\" href=\"mithril/merkle_tree/trait.MTHashLeaf.html\" title=\"trait mithril::merkle_tree::MTHashLeaf\">MTHashLeaf</a>&lt;<a class=\"struct\" href=\"mithril/atms/struct.MTValue.html\" title=\"struct mithril::atms::MTValue\">MTValue</a>&lt;A::<a class=\"type\" href=\"mithril/atms/trait.Atms.html#associatedtype.CheckedPK\" title=\"type mithril::atms::Atms::CheckedPK\">CheckedPK</a>&gt;&gt; + <a class=\"trait\" href=\"digest/digest/trait.Digest.html\" title=\"trait digest::digest::Digest\">Digest</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a>,&nbsp;</span>","synthetic":false,"types":["mithril::atms::AtmsError"]},{"text":"impl&lt;PE&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"enum\" href=\"mithril/key_reg/enum.RegisterError.html\" title=\"enum mithril::key_reg::RegisterError\">RegisterError</a>&lt;PE&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;PE: <a class=\"trait\" href=\"ark_ec/trait.PairingEngine.html\" title=\"trait ark_ec::PairingEngine\">PairingEngine</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a>,&nbsp;</span>","synthetic":false,"types":["mithril::key_reg::RegisterError"]},{"text":"impl&lt;PE:&nbsp;<a class=\"trait\" href=\"ark_ec/trait.PairingEngine.html\" title=\"trait ark_ec::PairingEngine\">PairingEngine</a>, F&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"enum\" href=\"mithril/mithril_proof/enum.MithrilWitnessError.html\" title=\"enum mithril::mithril_proof::MithrilWitnessError\">MithrilWitnessError</a>&lt;PE, F&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a>,&nbsp;</span>","synthetic":false,"types":["mithril::mithril_proof::MithrilWitnessError"]},{"text":"impl&lt;Error:&nbsp;<a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.57.0/std/primitive.i64.html\">i64</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"mithril/proof/trivial/struct.TrivialError.html\" title=\"struct mithril::proof::trivial::TrivialError\">TrivialError</a>&lt;Error&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a>,&nbsp;</span>","synthetic":false,"types":["mithril::proof::trivial::TrivialError"]},{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"enum\" href=\"mithril/stm/enum.AggregationFailure.html\" title=\"enum mithril::stm::AggregationFailure\">AggregationFailure</a>","synthetic":false,"types":["mithril::stm::AggregationFailure"]},{"text":"impl&lt;PE:&nbsp;<a class=\"trait\" href=\"ark_ec/trait.PairingEngine.html\" title=\"trait ark_ec::PairingEngine\">PairingEngine</a>, F&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"enum\" href=\"mithril/stm/enum.VerificationFailure.html\" title=\"enum mithril::stm::VerificationFailure\">VerificationFailure</a>&lt;PE, F&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a>,&nbsp;</span>","synthetic":false,"types":["mithril::stm::VerificationFailure"]},{"text":"impl&lt;Proof, PE&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"enum\" href=\"mithril/stm/enum.MultiVerificationFailure.html\" title=\"enum mithril::stm::MultiVerificationFailure\">MultiVerificationFailure</a>&lt;Proof, PE&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;Proof: <a class=\"trait\" href=\"mithril/mithril_proof/trait.MithrilProof.html\" title=\"trait mithril::mithril_proof::MithrilProof\">MithrilProof</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;PE: <a class=\"trait\" href=\"ark_ec/trait.PairingEngine.html\" title=\"trait ark_ec::PairingEngine\">PairingEngine</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a>,&nbsp;</span>","synthetic":false,"types":["mithril::stm::MultiVerificationFailure"]}];
implementors["num_bigint"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"num_bigint/struct.ParseBigIntError.html\" title=\"struct num_bigint::ParseBigIntError\">ParseBigIntError</a>","synthetic":false,"types":["num_bigint::ParseBigIntError"]},{"text":"impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"num_bigint/struct.TryFromBigIntError.html\" title=\"struct num_bigint::TryFromBigIntError\">TryFromBigIntError</a>&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,&nbsp;</span>","synthetic":false,"types":["num_bigint::TryFromBigIntError"]}];
implementors["num_rational"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"num_rational/struct.ParseRatioError.html\" title=\"struct num_rational::ParseRatioError\">ParseRatioError</a>","synthetic":false,"types":["num_rational::ParseRatioError"]}];
implementors["proc_macro2"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"proc_macro2/struct.LexError.html\" title=\"struct proc_macro2::LexError\">LexError</a>","synthetic":false,"types":["proc_macro2::LexError"]}];
implementors["rand"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"enum\" href=\"rand/distributions/enum.BernoulliError.html\" title=\"enum rand::distributions::BernoulliError\">BernoulliError</a>","synthetic":false,"types":["rand::distributions::bernoulli::BernoulliError"]},{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"enum\" href=\"rand/distributions/weighted/enum.WeightedError.html\" title=\"enum rand::distributions::weighted::WeightedError\">WeightedError</a>","synthetic":false,"types":["rand::distributions::weighted_index::WeightedError"]},{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"rand/rngs/adapter/struct.ReadError.html\" title=\"struct rand::rngs::adapter::ReadError\">ReadError</a>","synthetic":false,"types":["rand::rngs::adapter::read::ReadError"]}];
implementors["rand_core"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"rand_core/struct.Error.html\" title=\"struct rand_core::Error\">Error</a>","synthetic":false,"types":["rand_core::error::Error"]}];
implementors["syn"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"syn/parse/struct.Error.html\" title=\"struct syn::parse::Error\">Error</a>","synthetic":false,"types":["syn::error::Error"]}];
implementors["tracing_core"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"tracing_core/dispatcher/struct.SetGlobalDefaultError.html\" title=\"struct tracing_core::dispatcher::SetGlobalDefaultError\">SetGlobalDefaultError</a>","synthetic":false,"types":["tracing_core::dispatcher::SetGlobalDefaultError"]},{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"tracing_core/metadata/struct.ParseLevelError.html\" title=\"struct tracing_core::metadata::ParseLevelError\">ParseLevelError</a>","synthetic":false,"types":["tracing_core::metadata::ParseLevelError"]},{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"tracing_core/metadata/struct.ParseLevelFilterError.html\" title=\"struct tracing_core::metadata::ParseLevelFilterError\">ParseLevelFilterError</a>","synthetic":false,"types":["tracing_core::metadata::ParseLevelFilterError"]}];
implementors["tracing_subscriber"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"tracing_subscriber/filter/struct.ParseError.html\" title=\"struct tracing_subscriber::filter::ParseError\">ParseError</a>","synthetic":false,"types":["tracing_subscriber::filter::directive::ParseError"]},{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"tracing_subscriber/reload/struct.Error.html\" title=\"struct tracing_subscriber::reload::Error\">Error</a>","synthetic":false,"types":["tracing_subscriber::reload::Error"]},{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.57.0/std/error/trait.Error.html\" title=\"trait std::error::Error\">Error</a> for <a class=\"struct\" href=\"tracing_subscriber/util/struct.TryInitError.html\" title=\"struct tracing_subscriber::util::TryInitError\">TryInitError</a>","synthetic":false,"types":["tracing_subscriber::util::TryInitError"]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()