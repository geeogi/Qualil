import React, { useState } from "react";
import { Asset } from "./Components/Asset";
import { Button } from "./Components/Button";
import { ATTRIBUTE_COLOUR } from "./Config/colors";

const CONTAINER_PADDING = 16;
const GRAPH_MARGIN = 16;
const COINS = [
  "bitcoin",
  "ethereum",
  "tether",
  "ripple",
  "bitcoin-cash",
  "bitcoin-cash-sv",
  "litecoin",
  "cardano",
  "binancecoin",
];
const periods = [
  {
    value: 1,
    title: "1d",
  },
  {
    value: 7,
    title: "1w",
  },
  {
    value: 30,
    title: "1m",
  },
  {
    value: 90,
    title: "3m",
  },
  {
    value: 365,
    title: "1y",
  },
  {
    value: 1825,
    title: "5y",
  },
];

function App() {
  const [days, setDays] = useState(7);

  const containerWidth = window.innerWidth - CONTAINER_PADDING * 2;
  const boxWidth = containerWidth > 1000 ? containerWidth / 3 : containerWidth;
  const graphWidth = Math.floor(boxWidth - 2 * GRAPH_MARGIN);
  const graphHeight = Math.floor((9 / 16) * graphWidth);

  return (
    <div style={{ padding: CONTAINER_PADDING + "px" }}>
      <h1 style={{ margin: 0 }}>CoinTales</h1>
      <p style={{ margin: "0px 0px 16px 0px", color: ATTRIBUTE_COLOUR }}>
        Powered by CoinGecko
      </p>
      {periods.map((option) => (
        <Button
          onClick={() => setDays(option.value)}
          disabled={days === option.value}
        >
          {option.title}
        </Button>
      ))}
      <main
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {COINS.map((coin) => (
          <Asset
            key={coin}
            coin={coin}
            graphWidth={graphWidth}
            graphHeight={graphHeight}
            margin={GRAPH_MARGIN}
            days={days}
          />
        ))}
      </main>
      <footer>© 2020 CoinTales</footer>
    </div>
  );
}

export default App;
