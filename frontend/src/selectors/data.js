import { createSelector } from 'reselect';

export const businessesSelector = createSelector(
  state => state.data.businesses,
  businesses => Object.values(businesses)
);
