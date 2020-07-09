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
    return num.toString();
  }
};

/**
 * Map number to appropriate string format
 * @param x
 */
export const numberToString = (x: number) => {
  if (x > 1000000) {
    return abbreviate(x);
  } else {
    return x.toLocaleString();
  }
};

/**
 * `#000` => {r:0, g:0, b:0}
 * @param hex
 */
export const hexToRgb = (hex: string) => {
  // Strip whitespace
  hex = hex.replace(" ", "");

  // Validate Hex
  if (!(hex.length === 4 || hex.length === 7)) {
    throw new Error(`Unexpected hex length for hex: ${hex}`);
  }

  // Normalise short form hex
  if (hex.length === 4) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }

  // Decode hex
  const decoded = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!decoded) {
    throw new Error(`Could not decode hex: ${hex}`);
  }

  return {
    r: parseInt(decoded[1], 16),
    g: parseInt(decoded[2], 16),
    b: parseInt(decoded[3], 16),
  };
};
