export function clr(contributions) {
  const sumOfSquareRoots = contributions.reduce(
    (sum, contribution) => sum + Math.sqrt(contribution),
    0
  );

  const totalContributions = contributions.reduce(
    (sum, contribution) => sum + contribution,
    0
  );

  return totalContributions + Math.pow(sumOfSquareRoots, 2);
}

export function parseBusiness(b) {
  b.totalDonations = b.donations.reduce((sum, d) => sum + d, 0);
  b.totalMatchedDonations = clr(b.donations);
  return b;
}

export function parseBusinesses(businesses) {
  const ret = {};
  Object.entries(businesses).forEach(([id, b]) => {
    id = parseInt(id);
    b.id = id;
    ret[id] = parseBusiness(b);
  });
  return ret;
}

// (function main() {
//   const clr_prediction_curve = [
//     6496.77452758055,
//     6548.9579218522,
//     6619.66642447794,
//     6729.55599254295,
//     6838.96540535043,
//     6906.91845659433,
//   ];
//
//   console.log(predictCLRMatch(clr_prediction_curve, 50));
// })();
//
// export function predictCLRMatch(clr_prediction_curve, amount) {
//   if (amount > 10000) {
//     amount = 10000;
//   }
//
//   let predicted_clr = 0;
//
//   const contributions_axis = [0, 1, 10, 100, 1000, 10000];
//
//   let index = 0;
//
//   if (isNaN(amount)) {
//     predicted_clr = clr_prediction_curve[index];
//   } else if (contributions_axis.indexOf(amount) >= 0) {
//     index = contributions_axis.indexOf(amount);
//     predicted_clr = clr_prediction_curve[index];
//   } else {
//     let x_lower = 0;
//     let x_upper = 0;
//     let y_lower = 0;
//     let y_upper = 0;
//
//     if (0 < amount && amount < 1) {
//       x_lower = 0;
//       x_upper = 1;
//       y_lower = clr_prediction_curve[0];
//       y_upper = clr_prediction_curve[1];
//     } else if (1 < amount && amount < 10) {
//       x_lower = 1;
//       x_upper = 10;
//       y_lower = clr_prediction_curve[1];
//       y_upper = clr_prediction_curve[2];
//     } else if (10 < amount && amount < 100) {
//       x_lower = 10;
//       x_upper = 100;
//       y_lower = clr_prediction_curve[2];
//       y_upper = clr_prediction_curve[3];
//     } else if (100 < amount && amount < 1000) {
//       x_lower = 100;
//       x_upper = 1000;
//       y_lower = clr_prediction_curve[3];
//       y_upper = clr_prediction_curve[4];
//     } else {
//       x_lower = 1000;
//       x_upper = 10000;
//       y_lower = clr_prediction_curve[4];
//       y_upper = clr_prediction_curve[5];
//     }
//
//     predicted_clr = lerp(x_lower, x_upper, y_lower, y_upper, amount);
//   }
//
//   return {
//     clr_match_prediction: predicted_clr.toFixed(2),
//     clr_increase: (predicted_clr - clr_prediction_curve[0]).toFixed(2),
//   };
// }
//
// function lerp(x_lower, x_upper, y_lower, y_upper, x) {
//   return y_lower + ((y_upper - y_lower) * (x - x_lower)) / (x_upper - x_lower);
// }
