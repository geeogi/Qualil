import { UNIX_HOUR } from "../Config/constants";
import { roundToNearest } from "./numberUtils";

/**
 * Returns a list of prices corresponding to ticks
 * @param prices
 * @param ticks
 */
export const getPriceLabels = (
  prices: number[],
  ticks = [0.25, 0.5, 0.75, 1]
) => {
  const sortedPrices = prices.sort((a, b) => a - b);
  const total = sortedPrices.length;

  const min = sortedPrices[0];
  const max = sortedPrices[total - 1];
  const diff = max - min;

  return ticks.map((tick) => min + tick * diff);
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
  return ticks.map((tick) =>
    roundToNearest(unixTimestamps[Math.round(tick * total)], UNIX_HOUR)
  );
};
