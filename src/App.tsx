import React from "react";
import { Asset } from "./Components/Asset";

const CONTAINER_PADDING = 16;
const GRAPH_MARGIN = 16;

function App() {
  const containerWidth = window.innerWidth - CONTAINER_PADDING * 2;
  const boxWidth = containerWidth > 1000 ? containerWidth / 3 : containerWidth;
  const graphWidth = Math.floor(boxWidth - 2 * GRAPH_MARGIN);
  const graphHeight = Math.floor((9 / 16) * graphWidth);

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
        <Asset
          coin={"bitcoin"}
          graphWidth={graphWidth}
          graphHeight={graphHeight}
          margin={GRAPH_MARGIN}
        />
        <Asset
          coin={"ethereum"}
          graphWidth={graphWidth}
          graphHeight={graphHeight}
          margin={GRAPH_MARGIN}
        />
        <Asset
          coin={"tether"}
          graphWidth={graphWidth}
          graphHeight={graphHeight}
          margin={GRAPH_MARGIN}
        />
      </div>
    </div>
  );
}

export default App;
