use borsh::{BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId, Balance};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::vec::Vec;

const MIN_DONATION: Balance = 1_000_000_000_000_000_000_000_000; // 1 N

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
pub struct Business {
    name: String,
    image: String,
    description: String,
    donations: Vec<Balance>,
    // total_donations: Balance,
}

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
pub struct User {
    donations: Vec<Balance>,
    // total_donations: Balance,
}

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct DowntownStimulus {
    businesses: HashMap<u64, Business>,
    users: HashMap<AccountId, User>,
    total_donations: Balance,
}

#[near_bindgen]
impl DowntownStimulus {
    // #[init]
    // pub fn new() -> Self {
    //     assert!(env::state_read::<Self>().is_none(), "already initialized");
    //     let businesses: HashMap<u64, Business> = HashMap::new();
    //     let users: HashMap<AccountId, User> = HashMap::new();
    //     let total_donations: Balance = 0;
    //     let owner = env::predecessor_account_id();
    //     Self {
    //         businesses,
    //         users,
    //         total_donations,
    //         owner,
    //     }
    // }

    // Donate N to `business_id`
    #[payable]
    pub fn donate(&mut self, business_id: u64) {
        let amount = env::attached_deposit();
        env::log(format!("donating({}) to business({})", amount, business_id).as_bytes());
        assert!(amount >= MIN_DONATION, "not enough donation");

        match self.businesses.get_mut(&business_id) {
            Some(business) => {
                env::log(format!("recording business donation {}", business.name).as_bytes());
                &business.donations.push(amount);
            }
            _ => {
                env::panic(format!("unknown business {}", business_id).as_bytes());
            }
        }

        let account_id = env::signer_account_id();
        env::log(format!("recording user donation {}", account_id).as_bytes());
        match self.users.get_mut(&account_id) {
            Some(user) => {
                &user.donations.push(amount);
            }
            _ => {
                let mut donations: Vec<Balance> = Vec::new();
                donations.push(amount);
                let user = User { donations };
                self.users.insert(account_id, user);
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

    pub fn get_business(&self, business_id: u64) -> &Business {
        env::log(format!("looking up business({})", business_id).as_bytes());
        match self.businesses.get(&business_id) {
            Some(business) => {
                return business;
            }
            _ => {
                env::panic(format!("unknown business {}", business_id).as_bytes());
            }
        }
    }

    pub fn get_owner(&self) -> AccountId {
        return env::current_account_id().clone();
    }
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
