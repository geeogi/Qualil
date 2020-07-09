import React from "react";

export const Frame = (props: {
  children?: React.ReactNode;
  loading?: boolean;
  width: number;
  height: number;
}) => (
  <div
    style={{
      position: "relative",
      width: props.width + "px",
      height: props.height + "px",
      userSelect: "none",
    }}
  >
    {props.loading ? "loading..." : props.children}
  </div>
);
