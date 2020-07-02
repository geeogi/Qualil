export const getPriceLabels = (prices: number[], ticks = [0.25, 0.5, 0.75]) => {
  const sortedPrices = prices.sort((a, b) => a - b);
  const total = sortedPrices.length;

  const first = sortedPrices[0];
  const last = sortedPrices[total - 1];
  const diff = last - first;

  return ticks.map((tick) => Math.round(first + tick * diff));
};

export const getDateLabels = (
  unixTimestamps: number[],
  ticks = [0.25, 0.5, 0.75]
) => {
  const total = unixTimestamps.length;
  return ticks.map((tick) => unixTimestamps[Math.round(tick * total)]);
};
