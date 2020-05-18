import { createSelector } from 'reselect';
import clr from 'utils/clr';

export const businessesSelector = createSelector(
  state => state.data.businesses,
  businesses =>
    businesses.map(b => ({ ...b, totalMatchedDonations: clr(b.donations) }))
);
