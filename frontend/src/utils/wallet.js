import * as nearlib from 'near-api-js';
import getConfig from 'config/wallet';

const cache = {};

export default function() {
  return cache;
}

export async function load() {
  const nearConfig = getConfig(process.env.NEAR_ENV || 'development');
  // console.log('nearConfig', nearConfig);

  // Initializing connection to the NEAR DevNet.
  const near = await nearlib.connect(
    Object.assign(
      {
        deps: {
          keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore(),
        },
      },
      nearConfig
    )
  );

  // Needed to access wallet login
  const walletAccount = new nearlib.WalletAccount(near);

  // Getting the Account ID. If unauthorized yet, it's just empty string.
  const accountId = walletAccount.getAccountId();

  // Initializing our contract APIs by contract name and configuration.
  const account = await new nearlib.Account(near.connection, accountId);
  const contract = await new nearlib.Contract(
    account,
    nearConfig.contractName,
    {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: ['welcome'],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: ['set_greeting'],
      // Sender is the account ID to initialize transactions.
      sender: accountId,
    }
  );

  // console.log({
  //   nearConfig,
  //   near,
  //   wallet: walletAccount,
  //   accountId,
  //   account,
  //   contract,
  // });

  Object.entries({
    nearConfig,
    near,
    wallet: walletAccount,
    accountId,
    account,
    contract,
  }).forEach(([k, v]) => {
    cache[k] = v;
  });

  return cache;
}
