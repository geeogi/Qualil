import React from "react";

export const HorizontalGridLine = (props: { top: number }) => (
  <div
    className="HorizontalGridLine"
    style={{ borderTop: "solid 1px var(--axis-color)", top: props.top }}
  ></div>
);
