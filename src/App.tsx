import React, { useEffect, useState } from "react";
import { historicalData } from "./API/fetch";
import { Graph } from "./Components/Graph";
import { GraphValues } from "./Model/graph";

function App() {
  const [coin, setCoin] = useState("bitcoin");
  const [days, setDays] = useState(100);
  const [values, setValues] = useState<GraphValues>();

  useEffect(() => {
    historicalData(coin, days).then((values) => {
      setValues(values);
    });
  }, [coin, days]);

  const graphWidth = window.innerWidth / 4;
  const graphHeight = (9 / 16) * graphWidth;

  return (
    <div style={{ padding: "16px" }}>
      <h1>Quick charts</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {values && (
          <>
            <div>
              <h3>Bitcoin</h3>
              <Graph values={values} width={graphWidth} height={graphHeight} />
            </div>
            <div>
              <h3>Ethereum</h3>
              <Graph values={values} width={graphWidth} height={graphHeight} />
            </div>
            <div>
              <h3>XRP</h3>
              <Graph values={values} width={graphWidth} height={graphHeight} />
            </div>
            <div>
              <h3>Binance coin</h3>
              <Graph values={values} width={graphWidth} height={graphHeight} />
            </div>
            <div>
              <h3>Litecoin</h3>
              <Graph values={values} width={graphWidth} height={graphHeight} />
            </div>
            <div>
              <h3>Bitcoin cash</h3>
              <Graph values={values} width={graphWidth} height={graphHeight} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
