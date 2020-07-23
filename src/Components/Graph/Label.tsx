import React from "react";

export const Label = (props: { text: string; top: number; left: number }) => (
  <label
    className="Label"
    style={{
      top: props.top,
      left: props.left,
    }}
  >
    {props.text}
  </label>
);
