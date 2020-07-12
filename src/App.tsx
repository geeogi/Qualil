import React, { useState } from "react";
import { Asset } from "./Components/Asset";
import { Button } from "./Components/Button";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { COINS, PERIODS } from "./Config/constants";

const CONTAINER_PADDING = 16;
const GRAPH_MARGIN = window.innerWidth < 700 ? 0 : 16;

const App = () => {
  const [period, setPeriod] = useState(PERIODS[0]);

  const containerWidth = window.innerWidth - CONTAINER_PADDING * 2;
  const boxWidth = containerWidth > 1000 ? containerWidth / 3 : containerWidth;
  const graphWidth = Math.floor(boxWidth - 2 * GRAPH_MARGIN);
  const graphHeight = Math.floor((9 / 16) * graphWidth);

  return (
    <>
      <Header />
      <div style={{ padding: CONTAINER_PADDING + "px" }}>
        {PERIODS.map((option) => (
          <Button
            key={option.title}
            onClick={() => setPeriod(option)}
            disabled={period.value === option.value}
          >
            {option.title}
          </Button>
        ))}
        <main>
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
      </div>
      <Footer />
    </>
  );
};

export default App;
