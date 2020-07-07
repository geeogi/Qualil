import React from "react";
import { BACKGROUND_COLOR } from "../../Config/colors";

export const Label = (props: { text: string; top: number; left: number }) => (
  <label
    style={{
      position: "absolute",
      top: props.top,
      left: props.left,
      background: BACKGROUND_COLOR,
      padding: "1px",
      marginTop: "1px",
    }}
  >
    {props.text}
  </label>
);
