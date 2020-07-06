import React, { useState } from "react";
import { Asset } from "./Components/Asset";

const CONTAINER_PADDING = 16;
const GRAPH_MARGIN = 16;
const COINS = [
  "bitcoin",
  "ethereum",
  "tether",
  "ripple",
  "bitcoin-cash",
  "cardano",
];

function App() {
  const [days, setDays] = useState(7);

  const containerWidth = window.innerWidth - CONTAINER_PADDING * 2;
  const boxWidth = containerWidth > 1000 ? containerWidth / 3 : containerWidth;
  const graphWidth = Math.floor(boxWidth - 2 * GRAPH_MARGIN);
  const graphHeight = Math.floor((9 / 16) * graphWidth);

  return (
    <div style={{ padding: CONTAINER_PADDING + "px" }}>
      <h1>CoinTales</h1>
      <select onChange={(e) => setDays(parseInt(e.target.value))}>
        <option value="7">1w</option>
        <option value="30">1m</option>
        <option value="365">1y</option>
        <option value="1825">5y</option>
      </select>
      <div
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
      </div>
    </div>
  );
}

export default App;
