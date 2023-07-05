/**
 * @param {integer} amount purchased
 * @returns calculated point earned
 */

export const getRewardPoints = (amount) => {
  let rewardPoint =
    amount > 100
      ? (amount - 100) * 2 + 50
      : amount > 50
      ? (amount - 50) * 1
      : 0;
  return Math.ceil(rewardPoint);
};

/**
 * @param {string} num
 * @returns month as string
 */
export function getMonthString(num) {
  switch (parseInt(num)) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "Month data missing";
  }
}
