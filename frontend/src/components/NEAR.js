import React from 'react';
// import { formatNearAmount } from 'near-api-js/lib/utils/format';

export default ({ amount }) => {
  return <span>{(amount / 10 ** 24).toFixed(2)}</span>;
  // return <span>{formatNearAmount(amount, 2)}</span>;
};
