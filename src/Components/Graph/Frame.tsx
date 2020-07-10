import React from "react";

export const Frame = (props: {
  children?: React.ReactNode;
  loading?: boolean;
  width: number;
  height: number;
}) => (
  <div
    className="relative non-select"
    style={{ width: props.width + "px", height: props.height + "px" }}
  >
    {props.loading ? "loading..." : props.children}
  </div>
);
