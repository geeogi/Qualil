import React, { useState } from "react";
import { Asset } from "./Components/Asset";
import { Button } from "./Components/Button";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { COINS, PERIODS } from "./Config/constants";
import {
  CONTAINER_PADDING,
  graphHeight,
  graphWidth,
  GRAPH_MARGIN,
} from "./Config/dimensions";

const App = () => {
  const [period, setPeriod] = useState(PERIODS[0]);

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
