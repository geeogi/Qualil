import dayjs from "dayjs";
import { UNIX_HOUR } from "../Config/constants";
import { Period } from "../Model/graph";
import { roundToNearest } from "./numberUtils";

/**
 * Returns a list of prices corresponding to ticks
 * @param prices
 * @param ticks
 */
export const getPriceLabels = (prices: number[]) => {
  const sortedPrices = prices.sort((a, b) => a - b);
  const total = sortedPrices.length;

  const min = sortedPrices[0];
  const max = sortedPrices[total - 1];
  const diff = max - min;

  return [0.25, 0.5, 0.75, 1].map((tick) => min + tick * diff);
};

/**
 * Returns a list of timestamps corresponding to step/ticks
 * @param unixTimestamps
 */
export const getDateLabels = (unixTimestamps: number[], period: Period) => {
  const total = unixTimestamps.length;
  if (period.step) {
    const { step } = period;
    const start = dayjs(unixTimestamps[0]).startOf(step.unit);
    return [1, 2, 3].map(
      (tick) => start.add(tick * step.multiplier, step.unit).unix() * 1000
    );
  } else {
    return [0.25, 0.5, 0.75].map((tick) =>
      roundToNearest(unixTimestamps[Math.round(tick * total)], UNIX_HOUR)
    );
  }
};
