import React, { useEffect, useState } from "react";
import { getCoinHistoricalData, getCoinInfo } from "../API/fetch";
import { numberToString } from "../Core/numberUtils";
import { ChangeSince24H, CoinInfo } from "../Model/coin";
import { GraphValue, HistoricalData, Period } from "../Model/graph";
import { Attribute } from "./Asset/Attribute";
import { Title } from "./Asset/Title";
import { Graph } from "./Graph";
import { LoadingSpinner } from "./LoadingSpinner";

export const Asset = (props: {
  coin: string;
  graphWidth: number;
  graphHeight: number;
  margin: number;
  period: Period;
}) => {
  const [info, setInfo] = useState<CoinInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [historicalData, setHistoricalData] = useState<HistoricalData>();
  const [activeValue, setActiveValue] = useState<GraphValue>();

  const { coin, period, graphWidth, graphHeight, margin } = props;

  /**
   * Fetch and set coin data on load and whenever `period` changes
   */
  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();
    const { signal } = abortController;
    Promise.all([
      getCoinInfo(coin, signal),
      getCoinHistoricalData(coin, period.value, signal),
    ])
      .then(([info, values]) => {
        setHistoricalData({ period, values });
        setInfo(info);
        setIsLoading(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setError(e);
          setIsLoading(false);
        }
      });

    /**
     * Abort pending fetch requests during cleanup
     */
    return () => {
      abortController.abort();
      setError(undefined);
    };
  }, [coin, period]);

  /**
   * Render fixed size div while component is loading or in error state
   */
  if (!info || !historicalData || error) {
    return (
      <div
        className="m16 center-content"
        style={{
          width: graphWidth,
          height: graphHeight + 124,
        }}
      >
        {error ? (
          <p className="p16">
            Sorry, an error occurred fetching data for {coin}.
          </p>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  }

  const currentPrice = info.market_data.current_price["usd"];
  const dailyChange = info.market_data.price_change_24h_in_currency["usd"];
  const symbol = info.symbol.toUpperCase();
  const name = info.name;
  const image = info.image.small;
  const marketCap = info.market_data.market_cap["usd"];
  const ath = info.market_data.ath["usd"];
  const atl = info.market_data.atl["usd"];
  const totalVolume = info.market_data.total_volume["usd"];
  const { values } = historicalData;
  const positivePeriod = values[0].price < values[values.length - 1].price;

  return (
    <div style={{ margin: margin + "px" }}>
      <Title
        name={name}
        symbol={symbol}
        image={image}
        price={activeValue ? activeValue.price : currentPrice}
        unix={activeValue ? activeValue.unix : undefined}
        period={period}
        dailyChange={dailyChange}
        active={Boolean(activeValue)}
      />
      <Graph
        symbol={symbol}
        values={values}
        width={graphWidth}
        height={graphHeight}
        period={historicalData.period}
        change={
          positivePeriod ? ChangeSince24H.POSITIVE : ChangeSince24H.NEGATIVE
        }
        loading={isLoading}
        setActiveValue={setActiveValue}
      />
      <div className="flex-wrap my8" style={{ width: graphWidth }}>
        <div style={{ width: graphWidth / 2 + "px" }}>
          <Attribute attrib="Mkt cap" value={`$${numberToString(marketCap)}`} />
        </div>
        <div style={{ width: graphWidth / 2 + "px" }}>
          <Attribute attrib="ATH" value={`$${numberToString(ath)}`} />
        </div>
        <div style={{ width: graphWidth / 2 + "px" }}>
          <Attribute attrib="ATL" value={`$${numberToString(atl)}`} />
        </div>
        <div style={{ width: graphWidth / 2 + "px" }}>
          <Attribute attrib="Vol" value={`$${numberToString(totalVolume)}`} />
        </div>
      </div>
    </div>
  );
};
