import React, { useEffect, useState } from "react";
import "./App.css";
import { COINGECKO_BASE_URL } from "./Config/constants";
import { Graph } from "./Graph";
import { GraphValues } from "./types";

interface COINGECKO_RESPONSE {
  prices: number[][];
}

function App() {
  const [coin, setCoin] = useState("bitcoin");
  const [days, setDays] = useState(100);
  const [values, setValues] = useState<GraphValues>();

  useEffect(() => {
    const url = `${COINGECKO_BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=${days}`;
    fetch(url).then(async (response) => {
      const { prices }: COINGECKO_RESPONSE = await response.json();

      const newValues = prices.map(([unix, price]) => ({
        unix,
        price,
      }));

      setValues(newValues);
    });
  }, [coin, days]);

  return (
    <div className="App">
      <h1>Quick charts</h1>
      {values && <Graph values={values} />}
    </div>
  );
}

export default App;
