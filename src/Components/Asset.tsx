import React, { useEffect, useState } from "react";
import {
  COINGECKO_COIN_INFO,
  getCoinHistoricalData,
  getCoinInfo,
} from "../API/fetch";
import { Change } from "../Config/constants";
import { numberWithCommas } from "../Core/numberUtils";
import { GraphValues } from "../Model/graph";
import { Attribute } from "./Asset/Attribute";
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
  const ath = info.market_data.ath["usd"];
  const atl = info.market_data.atl["usd"];
  const totalVolume = info.market_data.total_volume["usd"];

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
      <div style={{ display: "flex", flexWrap: "wrap", width: graphWidth }}>
        <div style={{ width: `${graphWidth / 2}px` }}>
          <Attribute
            attrib="Mkt cap"
            value={`$${numberWithCommas(marketCap)}`}
          />
        </div>
        <div style={{ width: `${graphWidth / 2}px` }}>
          <Attribute
            attrib="All-time high"
            value={`$${numberWithCommas(ath)}`}
          />
        </div>
        <div style={{ width: `${graphWidth / 2}px` }}>
          <Attribute
            attrib="All-time low"
            value={`$${numberWithCommas(atl)}`}
          />
        </div>
        <div style={{ width: `${graphWidth / 2}px` }}>
          <Attribute
            attrib="Volume"
            value={`$${numberWithCommas(totalVolume)}`}
          />
        </div>
      </div>
    </div>
  );
};
