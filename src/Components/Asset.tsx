import React, { useEffect, useState } from "react";
import { generalData, historicalData } from "../API/fetch";
import { Change, CURRENCY } from "../Config/constants";
import { GraphValues } from "../Model/graph";
import { Title } from "./Asset/Title";
import { Graph } from "./Graph";

export const Asset = (props: {
  coin: string;
  graphWidth: number;
  graphHeight: number;
  margin: number;
  days: number;
}) => {
  const [values, setValues] = useState<GraphValues>();
  const [name, setName] = useState<string>();
  const [currentPrice, setCurrentPrice] = useState<number>();
  const [dailyChange, setDailyChange] = useState<number>();

  const { coin, days, graphWidth, graphHeight, margin } = props;

  useEffect(() => {
    Promise.all([generalData(coin), historicalData(coin, days)]).then(
      ([{ name, market_data }, values]) => {
        setValues(values);
        setName(name);
        setCurrentPrice(market_data.current_price[CURRENCY]);
        setDailyChange(market_data.price_change_24h_in_currency[CURRENCY]);
      }
    );
  }, [coin, days]);

  if (!currentPrice || !dailyChange || !name) {
    return <div />;
  }

  return (
    <div style={{ margin: margin + "px" }}>
      <Title
        name={name}
        dailyChange={dailyChange}
        currentPrice={currentPrice}
      />
      <Graph
        name={name}
        values={values}
        width={graphWidth}
        height={graphHeight}
        change={dailyChange >= 0 ? Change.POSITIVE : Change.NEGATIVE}
      />
    </div>
  );
};
