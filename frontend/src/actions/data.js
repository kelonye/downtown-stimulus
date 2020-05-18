import { ACTION_TYPE_UPDATE_DATA } from 'config';
import near from 'utils/wallet';

export function updateData(payload) {
  return {
    type: ACTION_TYPE_UPDATE_DATA,
    payload,
  };
}

export function sayHi(message) {
  return async(dispatch, getState) => {
    const { accountId, contract } = near();
    await contract.set_greeting({ message });
    dispatch(
      updateData({
        hi: await contract.welcome({ account_id: accountId }),
      })
    );
  };
}
