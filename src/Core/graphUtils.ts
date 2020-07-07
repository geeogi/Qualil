import { GraphPoints } from "../Model/graph";
import { getDateLabels, getPriceLabels } from "./labelUtils";
import { getScaleMethod } from "./numberUtils";

export const getGraphConfig = (args: {
  values: { unix: number; price: number }[];
}) => {
  // Determine the base for the config
  const { values } = args;

  // Calculate min, max and average price
  const minPrice = Math.min(...values.map((value) => value.price));
  const maxPrice = Math.max(...values.map((value) => value.price));

  // Calculate min, max date
  const earliestDate = values[0].unix;
  const latestDate = values[values.length - 1].unix;

  // Configure x-axis labels
  const dateLabels = getDateLabels(values.map(({ unix }) => unix));

  // Configure y-axis labels
  const priceLabels = getPriceLabels(values.map(({ price }) => price));

  // Configure x-axis scale helpers
  const unixMin = earliestDate;
  const unixMax = latestDate;
  const scaleUnixX = getScaleMethod(unixMin, unixMax, -1, 1);

  // Configure y-axis scale helpers
  const scalePriceY = getScaleMethod(minPrice, maxPrice, -1, 1);

  // Calculate point coordinates [-1,1]
  const points: GraphPoints = values.map((value) => ({
    x: scaleUnixX(value.unix),
    y: scalePriceY(value.price),
    price: value.price,
    unix: value.unix,
  }));

  return {
    priceLabels,
    dateLabels,
    points,
    scalePriceY,
    scaleUnixX,
  };
};
