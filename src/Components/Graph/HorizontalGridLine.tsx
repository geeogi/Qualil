import React from "react";

export const HorizontalGridLine = (props: { top: number }) => (
  <div
    style={{
      borderTop: "solid 1px red",
      width: "100%",
      height: "1px",
      position: "absolute",
      top: props.top,
    }}
  ></div>
);
