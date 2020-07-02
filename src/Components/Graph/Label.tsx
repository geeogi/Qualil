import React from "react";

export const Label = (props: { text: string; top: number; left: number }) => (
  <label style={{ position: "absolute", top: props.top, left: props.left }}>
    {props.text}
  </label>
);
