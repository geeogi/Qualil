import React from "react";

export const Label = (props: { text: string; top: number; left: number }) => (
  <label
    className="Label"
    style={{
      top: props.top,
      left: props.left,
      background: "var(--translucent-background-color)",
    }}
  >
    {props.text}
  </label>
);
