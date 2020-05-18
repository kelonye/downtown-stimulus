import { load } from 'utils/wallet';

export default Base =>
  class extends Base {
    async loadWallet() {
      const { wallet, contract, accountId } = await load();
      this.state.wallet = {
        isLoggedIn: await wallet.isSignedIn(),
      };
      // this.state.data.donations = await contract.welcome({ account_id: accountId });
    }
  };
