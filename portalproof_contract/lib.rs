#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod portalproof_contract {

    use ink::prelude::string::String;
    use ink::storage::Mapping;

   #[derive(
    scale::Encode,
    scale::Decode,
    Clone,
    Debug,
    PartialEq,
    Eq,
   
)]
   #[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
    pub struct Credential {

        recipient: AccountId,

        title: String,

        course: String,

        grade: String,

        issuer: AccountId,

        revoked: bool,
    }

    #[ink(storage)]
    pub struct PortalproofContract {

        credentials: Mapping<String, Credential>,
    }

    impl PortalproofContract {

        #[ink(constructor)]
        pub fn new() -> Self {

            Self {

                credentials: Mapping::default(),
            }
        }

        #[ink(message)]
        pub fn issue_credential(

            &mut self,

            credential_id: String,

            recipient: AccountId,

            title: String,

            course: String,

            grade: String,

        ) {

            let credential = Credential {

                recipient,

                title,

                course,

                grade,

                issuer: self.env().caller(),

                revoked: false,
            };

            self.credentials.insert(
                credential_id,
                &credential,
            );
        }

        #[ink(message)]
        pub fn verify_credential(

            &self,

            credential_id: String,

        ) -> bool {

            self.credentials.contains(
                credential_id
            )
        }

        #[ink(message)]
        pub fn revoke_credential(

            &mut self,

            credential_id: String,

        ) {

            let mut credential: Credential =
                self.credentials
                    .get(credential_id.clone())
                    .unwrap();

            credential.revoked = true;

            self.credentials.insert(
                credential_id,
                &credential,
            );
        }

        #[ink(message)]
        pub fn is_revoked(

            &self,

            credential_id: String,

        ) -> bool {

            let credential: Option<Credential> =
                self.credentials
                    .get(credential_id);

            match credential {

                Some(data) => data.revoked,

                None => false,
            }
        }
    }
}