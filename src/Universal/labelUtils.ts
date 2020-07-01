

export const getPriceLabels = (prices: number[]) => {
  const sortedPrices = prices.sort((a, b) => a - b);
  const total = sortedPrices.length;

  const first = Math.ceil(sortedPrices[0]);
  const third = Math.round(sortedPrices[total - 1]);
  const second = Math.ceil(first + (third - first) / 2);

  return [first, second, third];
};

export const getDateLabels = (unixTimestamps: number[]) => {
  const total = unixTimestamps.length;

  const first = unixTimestamps[0];
  const second = unixTimestamps[Math.round(total / 2)];
  const third = unixTimestamps[total - 1];

  return [first, second, third];
};
