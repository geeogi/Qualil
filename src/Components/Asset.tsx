import React, { useEffect, useState } from "react";
import { getCoinHistoricalData, getCoinInfo } from "../API/fetch";
import { numberToString } from "../Core/numberUtils";
import { ChangeSince24H, CoinInfo } from "../Model/coin";
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
  const [info, setInfo] = useState<CoinInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { coin, days, graphWidth, graphHeight, margin } = props;

  /**
   * Fetches and sets coin data on load and whenever `days` changes
   */
  useEffect(() => {
    setIsLoading(true);
    Promise.all([getCoinInfo(coin), getCoinHistoricalData(coin, days)])
      .then(([info, values]) => {
        setValues(values);
        setInfo(info);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [coin, days]);

  if (!info) {
    return <div />;
  }

  const currentPrice = info.market_data.current_price["usd"];
  const dailyChange = info.market_data.price_change_24h_in_currency["usd"];
  const name = info.name;
  const image = info.image.small;
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
        change={
          dailyChange >= 0 ? ChangeSince24H.POSITIVE : ChangeSince24H.NEGATIVE
        }
        loading={isLoading}
      />
      <div style={{ display: "flex", flexWrap: "wrap", width: graphWidth }}>
        <div style={{ width: `${graphWidth / 2}px` }}>
          <Attribute attrib="Mkt cap" value={`$${numberToString(marketCap)}`} />
        </div>
        <div style={{ width: `${graphWidth / 2}px` }}>
          <Attribute attrib="ATH" value={`$${numberToString(ath)}`} />
        </div>
        <div style={{ width: `${graphWidth / 2}px` }}>
          <Attribute attrib="ATL" value={`$${numberToString(atl)}`} />
        </div>
        <div style={{ width: `${graphWidth / 2}px` }}>
          <Attribute attrib="Vol" value={`$${numberToString(totalVolume)}`} />
        </div>
      </div>
    </div>
  );
};
