import React from "react";

export const Frame = (props: {
  children: React.ReactNode;
  width: number;
  height: number;
  margin: number;
}) => (
  <div
    style={{
      position: "relative",
      border: "solid 1px red",
      margin: props.margin + "px",
      width: props.width + "px",
      height: props.height + "px",
    }}
  >
    {props.children}
  </div>
);
