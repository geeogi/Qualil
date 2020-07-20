import React from "react";

export const VerticalGridLine = (props: { left: number }) => (
  <div
    className="VerticalGridLine"
    style={{ borderLeft: "solid 1px var(--axis-color)", left: props.left }}
  ></div>
);
