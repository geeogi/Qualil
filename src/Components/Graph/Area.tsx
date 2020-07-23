import React from "react";
import { CanvasPoint } from "../../Model/graph";

export const Area = (props: {
  symbol: string;
  height: number;
  width: number;
  points: CanvasPoint[];
  color: string;
}) => {
  const { symbol, height, width, points, color } = props;

  // Construct SVG points string
  const pointString = points
    ?.map((point) => `${point.canvasX},${point.canvasY}`)
    .join("\n");

  return (
    <>
      <polygon
        fill={`url(#gradient-${symbol}`}
        points={`0,${height}\n${pointString}\n${width},${height}`}
      />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={pointString}
      />
    </>
  );
};
