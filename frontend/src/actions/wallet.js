// import Promise from 'bluebird';
import { ACTION_TYPE_UPDATE_WALLET, APP_TITLE } from 'config';
import near from 'utils/wallet';
import { sleep } from 'utils';

export function loadWallet() {
  return async (dispatch, getState) => {
    try {
      dispatch(updateWallet({ isLoaded: false }));
      dispatch(
        updateWallet({
          isLoggedIn: near().wallet.isSignedIn(),
        })
      );
    } finally {
      dispatch(updateWallet({ isLoaded: true }));
    }
  };
}

export function activateWallet() {
  return async (dispatch, getState) => {
    const {
      wallet,
      nearConfig: { contractName },
    } = near();
    wallet.requestSignIn(contractName, APP_TITLE);
  };
}

export function deactivateWallet() {
  return async (dispatch, getState) => {
    near().wallet.signOut();
    await sleep(500);
    // dispatch(loadWallet());
    window.location.reload();
  };
}

export function updateWallet(payload) {
  return {
    type: ACTION_TYPE_UPDATE_WALLET,
    payload,
  };
}

export function fetchBalance(businessId) {
  return async (dispatch, getState) => {
    const { account } = near();
    dispatch(
      updateWallet({
        balance: (await account.getAccountBalance()).available,
      })
    );
  };
}
