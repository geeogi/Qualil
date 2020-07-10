import React from "react";

export const ActiveLine = (props: {
  left: number;
  color: string;
  width: number;
}) => (
  <div
    style={{
      borderLeft: `solid ${props.width}px ${props.color}`,
      height: "100%",
      width: "1px",
      position: "absolute",
      left: props.left - props.width / 2,
      zIndex: 1,
      pointerEvents: "none",
      userSelect: "none",
      touchAction: "none",
    }}
  ></div>
);
