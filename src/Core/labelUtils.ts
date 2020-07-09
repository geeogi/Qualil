import dayjs from "dayjs";
import { Period } from "../Model/graph";

/**
 * Generates a list of prices using tick percentages
 * @param prices
 * @param ticks
 */
export const getPriceLabels = (prices: number[]) => {
  const sortedPrices = prices.sort((a, b) => a - b);
  const total = sortedPrices.length;

  const min = sortedPrices[0];
  const max = sortedPrices[total - 1];
  const diff = max - min;

  const ticks = [0.25, 0.5, 0.75, 1];
  return ticks.map((tick) => min + tick * diff);
};

/**
 * Generates a list of timestamps using step max/unit/multiplier
 * @param unixTimestamps
 */
export const getDateLabels = (unixTimestamps: number[], period: Period) => {
  const max = period.step ? period.step.max : 7;
  const multiplier = period.step ? period.step.multiplier : 1;
  const unit = period.step ? period.step.unit : "y";

  const labels = [];

  const start = dayjs(unixTimestamps[0]);
  const end = dayjs(unixTimestamps[unixTimestamps.length - 1]);

  let thisLabel = start.startOf(unit).add(multiplier, unit);
  while (thisLabel.isBefore(end) && labels.length < max) {
    labels.push(thisLabel.unix() * 1000);
    thisLabel = thisLabel.add(multiplier, unit);
  }

  return labels;
};
