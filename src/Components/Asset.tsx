import React from "react";
import { GraphValues } from "../Model/graph";
import { Graph } from "./Graph";

export const Asset = (props: {
  values: GraphValues;
  graphWidth: number;
  graphHeight: number;
  margin: number;
}) => {
  const latestValue = props.values[props.values.length - 1];
  const latestPrice = Math.round(latestValue.price);
  return (
    <div>
      <h3>Bitcoin {latestPrice} +2.45%</h3>
      <Graph
        values={props.values}
        width={props.graphWidth}
        height={props.graphHeight}
        margin={props.margin}
      />
    </div>
  );
};
