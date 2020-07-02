import React from "react";

export const Frame = (props: {
  children: React.ReactNode;
  width: number;
  height: number;
}) => (
  <div
    style={{
      position: "relative",
      border: "solid 1px red",

      width: props.width + "px",
      height: props.height + "px",
    }}
  >
    {props.children}
  </div>
);
