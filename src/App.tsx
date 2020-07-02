import React, { useEffect, useState } from "react";
import { historicalData } from "./API/fetch";
import { Asset } from "./Components/Asset";
import { GraphValues } from "./Model/graph";

const CONTAINER_PADDING = 16;
const GRAPH_MARGIN = 16;

function App() {
  const [coin, setCoin] = useState("bitcoin");
  const [days, setDays] = useState(100);
  const [values, setValues] = useState<GraphValues>();

  const containerWidth = window.innerWidth - CONTAINER_PADDING * 2;
  const boxWidth = containerWidth > 1000 ? containerWidth / 3 : containerWidth;
  const graphWidth = Math.floor(boxWidth - 2 * GRAPH_MARGIN);
  const graphHeight = Math.floor((9 / 16) * graphWidth);

  useEffect(() => {
    historicalData(coin, days).then((values) => {
      setValues(values);
    });
  }, [coin, days]);

  return (
    <div style={{ padding: CONTAINER_PADDING + "px" }}>
      <h1>CoinTales</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {values && (
          <>
            <Asset
              values={values}
              graphWidth={graphWidth}
              graphHeight={graphHeight}
              margin={GRAPH_MARGIN}
            />
            <Asset
              values={values}
              graphWidth={graphWidth}
              graphHeight={graphHeight}
              margin={GRAPH_MARGIN}
            />
            <Asset
              values={values}
              graphWidth={graphWidth}
              graphHeight={graphHeight}
              margin={GRAPH_MARGIN}
            />
            <Asset
              values={values}
              graphWidth={graphWidth}
              graphHeight={graphHeight}
              margin={GRAPH_MARGIN}
            />
            <Asset
              values={values}
              graphWidth={graphWidth}
              graphHeight={graphHeight}
              margin={GRAPH_MARGIN}
            />
            <Asset
              values={values}
              graphWidth={graphWidth}
              graphHeight={graphHeight}
              margin={GRAPH_MARGIN}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
