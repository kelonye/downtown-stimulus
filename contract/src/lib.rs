use borsh::{BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId, Balance};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::vec::Vec;

const MIN_DONATION: Balance = 1_000_000;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
pub struct Business {
    name: String,
    image: String,
    description: String,
    donations: Vec<Balance>,
}

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
pub struct User {
    donations: Vec<Balance>,
}

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct DowntownStimulus {
    businesses: HashMap<u64, Business>,
    donations: HashMap<AccountId, User>,
    total_donations: Balance,
}

#[near_bindgen]
impl DowntownStimulus {
    // Donate N to `business_id`
    #[payable]
    pub fn donate(&mut self, business_id: u64) {
        assert!(env::attached_deposit() >= MIN_DONATION, "Not enough donation");

        match self.businesses.get_mut(&business_id) {
            Some(business) => {
                env::log(format!("recording business donation {}", business.name).as_bytes());
                let amount = env::attached_deposit();
                &business.donations.push(amount);
            }
            _ => {
                env::panic(format!("unknown business {}", business_id).as_bytes());
            }
        }
    }

    pub fn register_business(&mut self, name: String, image: String, description: String) {
        env::log(format!("registering business {} {} {}", name, image, description).as_bytes());

        let id: u64 = (self.businesses.len() as u64) + 1;
        let donations: Vec<Balance> = Vec::new();
        let business = Business {
            name,
            image,
            description,
            donations,
        };
        self.businesses.insert(id, business);
    }

    pub fn get_businesses(&self) -> &HashMap<u64, Business> {
        env::log(format!("looking up businesses").as_bytes());
        return &self.businesses;
    }
}

#[cfg(not(target_arch = "wasm32"))]
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::{MockedBlockchain, testing_env, VMContext, AccountId};

    fn alice() -> AccountId {
        "alice.near".to_string()
    }

    fn bob() -> AccountId {
        "bob.near".to_string()
    }

    fn carol() -> AccountId {
        "carol.near".to_string()
    }

    fn get_context(predecessor_account_id: AccountId) -> VMContext {
        VMContext {
            current_account_id: alice(),
            signer_account_id: bob(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id,
            input: vec![],
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 10u64.pow(6),
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view: false,
            output_data_receivers: vec![],
            epoch_height: 0,
        }
    }

    #[test]
    fn donate() {
        let mut context = get_context(carol());
        context.attached_deposit = MIN_DONATION;
        testing_env!(context);

        let mut contract = DowntownStimulus::default();
        contract.register_business(
            "Peet's Coffee".to_string(),
            "coffee.png".to_string(),
            "In need of 10k stimulus in order to keep all our loyal staff through the year."
                .to_string(),
        );

        for (id, b) in contract.get_businesses().iter() {
            assert_eq!(id, &1);
            assert_eq!(b.name, "Peet's Coffee");
            assert_eq!(b.donations.len(), 0);
        }

        contract.donate(1);

        for (_id, b) in contract.get_businesses().iter() {
            assert_eq!(b.donations.len(), 1);
            assert_eq!(b.donations[0], MIN_DONATION);
        }
    }
}
