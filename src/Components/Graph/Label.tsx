import React from "react";
import { BACKGROUND_COLOR } from "../../Config/colors";
import { hexToRgb } from "../../Core/numberUtils";

const { r, g, b } = hexToRgb(BACKGROUND_COLOR);

export const Label = (props: { text: string; top: number; left: number }) => (
  <label
    style={{
      position: "absolute",
      top: props.top,
      left: props.left,
      background: `rgba(${r}, ${g}, ${b}, 0.5)`,
      padding: "1px 3px",
      marginTop: "1px",
      borderRadius: "0 3px 3px 0",
      pointerEvents: "none",
      userSelect: "none",
      touchAction: "none",
    }}
  >
    {props.text}
  </label>
);
