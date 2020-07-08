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

/**
 * 0.433576894 => `0.433`
 * @param x
 */
export const numberWithSignificantDigits = (x: number) => {
  return parseFloat(x.toPrecision(4)).toLocaleString();
};

/**
 * Rounds to nearest multiple
 * @param num
 * @param multiple
 */
export const roundToNearest = (num: number, multiple: number) => {
  return Math.round(num / multiple) * multiple;
};

/**
 * 8962055 => `8.9M`
 * 8962053455 => `8.9B`
 * @param num
 */
export const abbreviate = (num: number) => {
  if (num > 1000000000) {
    const rounded = parseFloat(num.toPrecision(2));
    return `${rounded / 1000000000}B`;
  } else if (num > 1000000) {
    const rounded = parseFloat(num.toPrecision(2));
    return `${rounded / 1000000}M`;
  } else {
    return num;
  }
};

/**
 * @param x
 */
export const numberToString = (x: number) => {
  if (x > 1000000) {
    return abbreviate(x);
  } else {
    return x.toLocaleString();
  }
};
