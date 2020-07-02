import React from "react";

export const Label = (props: { text: string; top: number; left: number }) => (
  <label
    style={{
      position: "absolute",
      top: props.top,
      left: props.left,
      background: "white",
      padding: 0,
      marginTop: "1px",
    }}
  >
    {props.text}
  </label>
);
