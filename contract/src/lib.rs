use borsh::{BorshDeserialize, BorshSerialize};
use near_bindgen::{env, near_bindgen};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::vec::Vec;
use near_sdk::{payable};

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
pub struct Business {
    id: u8,
    name: String,
    donations: HashMap<String, String>,
}

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct DowntownStimulus {
    businesses: Vec<Business>,
}

#[near_bindgen]
impl DowntownStimulus {
    #[payable]
    pub fn donate(&mut self, business_id: String) {
        env::log(b"record donation");
        // let account_id = env::signer_account_id();
        // self.records.insert(account_id, message);
        //
        // let amount = env::attached_deposit();
        // account.unstaked += amount;
        // self.save_account(&account_id, &account);
        // self.last_total_balance += amount;
    }

    // pub fn get_businesses(&self) -> Business {
    //     env::log(b"looking up businesses");
    //     match self.records.get(&business_id) {
    //         None => {
    //             env::log(b"using default message");
    //             return TextMessage { text: format!("Hello {}", account_id) }
    //         },
    //         _ => return TextMessage { text: format!("{} {}", self.records.get(&account_id).unwrap(), account_id) }
    //     }
    // }
    //
    // pub fn get_business(&self, business_id: String) -> Business {
    //     env::log(b"looking up business");
    //     match self.records.get(&business_id) {
    //         None => {
    //             env::log(b"using default message");
    //             return TextMessage { text: format!("Hello {}", account_id) }
    //         },
    //         _ => return TextMessage { text: format!("{} {}", self.records.get(&account_id).unwrap(), account_id) }
    //     }
    // }
}

#[cfg(not(target_arch = "wasm32"))]
#[cfg(test)]
mod tests {
    use super::*;
    use near_bindgen::MockedBlockchain;
    use near_bindgen::{testing_env, VMContext};

    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice_near".to_string(),
            signer_account_id: "bob_near".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "carol_near".to_string(),
            input,
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
        }
    }

    // #[test]
    // fn donate() {
    //     let context = get_context(vec![], false);
    //     testing_env!(context);
    //     let mut contract = DowntownStimulus::default();
    //     contract.set_greeting("howdy".to_string());
    //     assert_eq!("howdy bob_near".to_string(), contract.welcome("bob_near".to_string()).text);
    // }

    // #[test]
    // fn get_nonexistent_message() {
    //     let context = get_context(vec![], true);
    //     testing_env!(context);
    //     let contract = DowntownStimulus::default();
    //     assert_eq!("Hello francis.near".to_string(), contract.welcome("francis.near".to_string()).text);
    // }
}
