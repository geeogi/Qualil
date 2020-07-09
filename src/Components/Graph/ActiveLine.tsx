import React from "react";

export const ActiveLine = (props: { left: number; color: string }) => (
  <div
    style={{
      borderLeft: `solid 1px ${props.color}`,
      height: "100%",
      width: "1px",
      position: "absolute",
      left: props.left,
      zIndex: 1,
      pointerEvents: "none",
      userSelect: "none",
      touchAction: "none",
    }}
  ></div>
);
