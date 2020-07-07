/**
 * * Returns method which will scale linearly between two value ranges
 * @param {*} minPrimaryValue
 * @param {*} maxPrimaryValue
 * @param {*} minSecondaryValue
 * @param {*} maxSecondaryValue
 */
export const getScaleMethod = (
  minPrimaryValue: number,
  maxPrimaryValue: number,
  minSecondaryValue: number,
  maxSecondaryValue: number
) => {
  const primaryValueRange = maxPrimaryValue - minPrimaryValue;
  const secondaryValueRange = maxSecondaryValue - minSecondaryValue;

  return (primaryValue: number) => {
    const normalizedPrimaryValue = primaryValue - minPrimaryValue;
    const primaryPercentage = normalizedPrimaryValue / primaryValueRange;
    return minSecondaryValue + primaryPercentage * secondaryValueRange;
  };
};

export const numberToString = (x: number) => {
  return x.toLocaleString();
};

export const numberWithSignificantDigits = (x: number) => {
  return parseFloat(x.toPrecision(4)).toLocaleString();
};

export const roundToNearest = (num: number, multiple: number) => {
  return Math.round(num / multiple) * multiple;
};
