import React, { useEffect, useState } from "react";
import { generalData, historicalData } from "../API/fetch";
import { CURRENCY } from "../Config/constants";
import { GraphValues } from "../Model/graph";
import { Graph } from "./Graph";

export const Asset = (props: {
  coin: string;
  graphWidth: number;
  graphHeight: number;
  margin: number;
}) => {
  const [days, setDays] = useState(7);
  const [values, setValues] = useState<GraphValues>();
  const [name, setName] = useState<string>();
  const [currentPrice, setCurrentPrice] = useState<number>();
  const [dailyChange, setDailyChange] = useState<number>();

  useEffect(() => {
    Promise.all([
      generalData(props.coin),
      historicalData(props.coin, days),
    ]).then(([{ name, market_data }, values]) => {
      setValues(values);
      setName(name);
      setCurrentPrice(market_data.current_price[CURRENCY]);
      setDailyChange(market_data.price_change_24h_in_currency[CURRENCY]);
    });
  }, [props.coin, days]);

  if (!currentPrice || !dailyChange) {
    return <div />;
  }
  const price24HoursAgo = currentPrice + dailyChange;
  const dailyChangeDivision = Math.abs(dailyChange / price24HoursAgo);
  const dailyChangePercent = Math.round(dailyChangeDivision * 10000) / 100;
  const sign = dailyChange >= 0 ? "+" : "-";

  const title = `${name} ${currentPrice} ${sign}${dailyChangePercent}%`;

  return (
    <div style={{ margin: props.margin + "px" }}>
      <h3>{title}</h3>
      <Graph
        values={values}
        width={props.graphWidth}
        height={props.graphHeight}
      />
    </div>
  );
};
