import { load } from 'utils/wallet';
import { parseBusinesses } from 'utils/data';

export default Base =>
  class extends Base {
    async loadData() {
      const { wallet, contract, accountId, account } = await load();
      const isLoggedIn = await wallet.isSignedIn();
      this.state.wallet = {
        isLoggedIn,
        accountId,
        balance: isLoggedIn && (await account.getAccountBalance()).available,
      };
      this.state.data.businesses = parseBusinesses(
        await contract.get_businesses()
      );
    }
  };
