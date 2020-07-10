import React from "react";

export const ActiveCircle = (props: {
  color: string;
  top: number;
  left: number;
  size: number;
}) => (
  <div
    className="ActiveCircle"
    style={{
      top: props.top - props.size / 2,
      left: props.left - props.size / 2,
      width: props.size + "px",
      height: props.size + "px",
      background: props.color,
    }}
  ></div>
);
