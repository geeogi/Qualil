import React, { useState } from "react";
import { Asset } from "./Components/Asset";
import { Button } from "./Components/Button";
import { ATTRIBUTE_COLOUR } from "./Config/colors";
import { PERIODS, COINS } from "./Config/constants";

const isMobile = window.innerWidth < 700;

const CONTAINER_PADDING = 16;
const GRAPH_MARGIN = isMobile ? 0 : 16;

function App() {
  const [period, setPeriod] = useState(PERIODS[0]);

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
      {PERIODS.map((option) => (
        <Button
          onClick={() => setPeriod(option)}
          disabled={period.value === option.value}
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
            period={period}
          />
        ))}
      </main>
      <footer>© 2020 CoinTales</footer>
    </div>
  );
}

export default App;
