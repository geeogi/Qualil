/**
 * Returns a list of prices corresponding to ticks
 * @param prices
 * @param ticks
 */
export const getPriceLabels = (prices: number[], ticks = [0.25, 0.5, 0.75]) => {
  const sortedPrices = prices.sort((a, b) => a - b);
  const total = sortedPrices.length;

  const first = sortedPrices[0];
  const last = sortedPrices[total - 1];
  const diff = last - first;

  return ticks.map((tick) => parseFloat((first + tick * diff).toPrecision(5)));
};

/**
 * Returns a list of timestamps corresponding to ticks
 * @param unixTimestamps
 * @param ticks
 */
export const getDateLabels = (
  unixTimestamps: number[],
  ticks = [0.25, 0.5, 0.75]
) => {
  const total = unixTimestamps.length;
  return ticks.map((tick) => unixTimestamps[Math.round(tick * total)]);
};
