use borsh::{BorshDeserialize, BorshSerialize};
use near_sdk::collections::{Map, Vector};
use near_sdk::{env, near_bindgen, AccountId, Balance};
// use serde::{Deserialize, Serialize};

const MIN_DONATION: Balance = 1_000_000_000_000_000_000_000_000; // 1 N

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Business {
    name: String,
    image: String,
    description: String,
    donations: Vector<Balance>,
    // total_donations: Balance,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct User {
    donations: Vector<Balance>,
    // total_donations: Balance,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct DowntownStimulus {
    businesses: Map<u64, Business>,
    users: Map<AccountId, User>,
    total_donations: Balance,
}

impl Default for DowntownStimulus {
    fn default() -> Self {
        Self {
            businesses: Map::new(b"businesses".to_vec()),
            users: Map::new(b"users".to_vec()),
            total_donations: 0,
        }
    }
}

#[near_bindgen]
impl DowntownStimulus {
    // Donate N to `business_id`
    #[payable]
    pub fn donate(&mut self, business_id: u64) {
        let amount = env::attached_deposit();
        env::log(format!("donating({}) to business({})", amount, business_id).as_bytes());
        assert!(amount >= MIN_DONATION, "not enough donation");

        match self.businesses.get(&business_id) {
            Some(business) => {
                env::log(format!("recording business donation {}", business.name).as_bytes());
                business.donations.push(&amount);
            }
            _ => {
                env::panic(format!("unknown business {}", business_id).as_bytes());
            }
        }

        let account_id = env::signer_account_id();
        env::log(format!("recording user donation {}", account_id).as_bytes());
        match self.users.get(&account_id) {
            Some(user) => {
                &user.donations.push(&amount);
            }
            _ => {
                let mut donations: Vector<Balance> = Vector::new(
                    format!("user::donations::{}", account_id)
                        .as_bytes()
                        .to_vec(),
                );
                donations.push(&amount);
                let user = User { donations };
                self.users.insert(&account_id, &user);
            }
        }

        self.total_donations += amount;
    }

    pub fn register_business(&mut self, name: String, image: String, description: String) {
        assert_eq!(
            env::current_account_id(),
            env::signer_account_id(),
            "owner required"
        );
        env::log(format!("registering business {} {} {}", name, image, description).as_bytes());

        let business_id: u64 = (self.businesses.len() as u64) + 1;
        let donations: Vector<Balance> = Vector::new(
            format!("business::donations::{}", business_id)
                .as_bytes()
                .to_vec(),
        );
        let business = Business {
            name,
            image,
            description,
            donations,
        };
        self.businesses.insert(&business_id, &business);
    }

    // pub fn get_businesses(&self) -> &Map<u64, Business> {
    //     env::log(format!("looking up businesses").as_bytes());
    //     return &self.businesses;
    // }
    //
    // pub fn get_business(&self, business_id: u64) -> &Business {
    //     env::log(format!("looking up business({})", business_id).as_bytes());
    //     match self.businesses.get(&business_id) {
    //         Some(business) => {
    //             return &business;
    //         }
    //         _ => {
    //             env::panic(format!("unknown business {}", business_id).as_bytes());
    //         }
    //     }
    // }
    //
    // pub fn get_owner(&self) -> AccountId {
    //     return env::current_account_id().clone();
    // }
}

#[cfg(not(target_arch = "wasm32"))]
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::{testing_env, AccountId, MockedBlockchain, VMContext};

    fn contract_owner() -> AccountId {
        "contract-owner.near".to_string()
    }

    fn business_owner() -> AccountId {
        "business-owner.near".to_string()
    }

    fn donor() -> AccountId {
        "donator.near".to_string()
    }

    fn get_context(account_id: AccountId) -> VMContext {
        VMContext {
            current_account_id: contract_owner(),
            signer_account_id: account_id.clone(),
            predecessor_account_id: account_id.clone(),
            signer_account_pk: vec![0, 1, 2],
            input: vec![],
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 10u64.pow(6),
            attached_deposit: MIN_DONATION,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view: false,
            output_data_receivers: vec![],
            epoch_height: 0,
        }
    }

    #[test]
    fn donate() {
        let context = get_context(contract_owner());
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

        for (id, u) in contract.users.iter() {
            assert_eq!(id, &contract_owner());
            assert_eq!(u.donations.len(), 1);
            assert_eq!(u.donations[0], MIN_DONATION);
        }
    }

    #[test]
    #[should_panic(expected = "owner required")]
    fn assert_only_owner_can_register_business() {
        let context = get_context(contract_owner());
        testing_env!(context);

        let mut contract = DowntownStimulus::default();

        let context = get_context(donor());
        testing_env!(context);

        contract.register_business(
            "Peet's Coffee".to_string(),
            "coffee.png".to_string(),
            "In need of 10k stimulus in order to keep all our loyal staff through the year."
                .to_string(),
        );
    }
}
