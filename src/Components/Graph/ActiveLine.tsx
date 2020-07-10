import React from "react";

export const ActiveLine = (props: {
  left: number;
  color: string;
  width: number;
}) => (
  <div
    className="ActiveLine"
    style={{
      borderLeft: `solid ${props.width}px ${props.color}`,
      left: props.left - props.width / 2,
    }}
  ></div>
);
