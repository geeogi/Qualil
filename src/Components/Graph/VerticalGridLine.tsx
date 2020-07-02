import React from "react";

export const VerticalGridLine = (props: { left: number }) => (
  <div
    style={{
      borderLeft: "solid 1px red",
      height: "100%",
      width: "1px",
      position: "absolute",
      left: props.left,
    }}
  ></div>
);
