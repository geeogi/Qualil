import React from "react";
import { BACKGROUND_COLOR } from "../../Config/colors";
import { hexToRgb } from "../../Core/numberUtils";

const { r, g, b } = hexToRgb(BACKGROUND_COLOR);

export const Label = (props: { text: string; top: number; left: number }) => (
  <label
    className="Label"
    style={{
      top: props.top,
      left: props.left,
      background: `rgba(${r}, ${g}, ${b}, 0.5)`,
    }}
  >
    {props.text}
  </label>
);
