import React, { useEffect, useState } from "react";
import { getCoinHistoricalData, getCoinInfo } from "../API/fetch";
import { numberToString } from "../Core/numberUtils";
import { ChangeSince24H, CoinInfo } from "../Model/coin";
import { GraphValues, Period } from "../Model/graph";
import { ActiveTitle } from "./Asset/ActiveTitle";
import { Attribute } from "./Asset/Attribute";
import { Title } from "./Asset/Title";
import { Graph } from "./Graph";

export const Asset = (props: {
  coin: string;
  graphWidth: number;
  graphHeight: number;
  margin: number;
  period: Period;
}) => {
  const [values, setValues] = useState<GraphValues>();
  const [info, setInfo] = useState<CoinInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [activeValue, setActiveValue] = useState<{
    price: number;
    unix: number;
  }>();

  const { coin, period, graphWidth, graphHeight, margin } = props;

  /**
   * Fetches and sets coin data on load and whenever `days` changes
   */
  useEffect(() => {
    setIsLoading(true);
    Promise.all([getCoinInfo(coin), getCoinHistoricalData(coin, period.value)])
      .then(([info, values]) => {
        setValues(values);
        setInfo(info);
      })
      .catch(setError)
      .finally(() => {
        setIsLoading(false);
      });
  }, [coin, period]);

  if (!info || !values) {
    return (
      <div
        style={{ width: graphWidth + 32, height: graphHeight + 32 + 60 + 32 }}
      >
        {error && (
          <p>An error occurred when connecting to CoinGecko: {error.message}</p>
        )}
      </div>
    );
  }

  const currentPrice = info.market_data.current_price["usd"];
  const dailyChange = info.market_data.price_change_24h_in_currency["usd"];
  const name = info.name;
  const image = info.image.small;
  const marketCap = info.market_data.market_cap["usd"];
  const ath = info.market_data.ath["usd"];
  const atl = info.market_data.atl["usd"];
  const totalVolume = info.market_data.total_volume["usd"];
  const positivePeriod = values[0].price < values[values.length - 1].price;

  return (
    <div style={{ margin: margin + "px" }}>
      {activeValue ? (
        <ActiveTitle
          name={name}
          image={image}
          price={activeValue.price}
          unix={activeValue.unix}
        />
      ) : (
        <Title
          name={name}
          image={image}
          dailyChange={dailyChange}
          currentPrice={currentPrice}
        />
      )}
      <Graph
        name={name}
        values={values}
        width={graphWidth}
        height={graphHeight}
        period={period}
        change={
          positivePeriod ? ChangeSince24H.POSITIVE : ChangeSince24H.NEGATIVE
        }
        loading={isLoading}
        setActiveValue={setActiveValue}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: graphWidth,
          margin: "8px 0",
        }}
      >
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
