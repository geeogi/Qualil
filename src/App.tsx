import React, { useEffect, useState } from "react";
import "./App.css";
import { COINGECKO_BASE_URL } from "./Config/constants";
import { Graph } from "./Graph/Graph";
import { GraphValues } from "./types";

interface COINGECKO_RESPONSE {
  prices: number[][];
}

function App() {
  const [coin, setCoin] = useState("bitcoin");
  const [days, setDays] = useState(100);
  const [values, setValues] = useState<GraphValues>();

  useEffect(() => {
    fetch(`${COINGECKO_BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=${days}`).then(async (response) => {
      const responseJson: COINGECKO_RESPONSE = await response.json();
      const newValues = responseJson.prices.map(([dateTimeUnix, price]) => ({
        dateTimeUnix,
        price,
      }));
      setValues(newValues);
    });
  });

  return (
    <div className="App">
      <h1>Quick charts</h1>
      {values && <Graph values={values} />}
    </div>
  );
}

export default App;
