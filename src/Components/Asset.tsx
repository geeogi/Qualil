import React, { useEffect, useState } from "react";
import {
  COINGECKO_COIN_INFO,
  getCoinHistoricalData,
  getCoinInfo,
} from "../API/fetch";
import { Change } from "../Config/constants";
import { numberWithCommas } from "../Core/numberUtils";
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
  const [info, setInfo] = useState<COINGECKO_COIN_INFO>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { coin, days, graphWidth, graphHeight, margin } = props;

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getCoinInfo(coin), getCoinHistoricalData(coin, days)]).then(
      ([info, values]) => {
        setValues(values);
        setInfo(info);
        setIsLoading(false);
      }
    );
  }, [coin, days]);

  if (!info) {
    return <div />;
  }

  const currentPrice = info.market_data.current_price["usd"];
  const dailyChange = info.market_data.price_change_24h_in_currency["usd"];
  const name = info.name;
  const image = info.image.thumb;
  const marketCap = info.market_data.market_cap["usd"];

  return (
    <div style={{ margin: margin + "px" }}>
      <Title
        name={name}
        image={image}
        dailyChange={dailyChange}
        currentPrice={currentPrice}
      />
      <Graph
        name={name}
        values={values}
        width={graphWidth}
        height={graphHeight}
        change={dailyChange >= 0 ? Change.POSITIVE : Change.NEGATIVE}
        loading={isLoading}
      />
      <p>Mkt Cap: ${numberWithCommas(marketCap)}</p>
    </div>
  );
};
