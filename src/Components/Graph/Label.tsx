import React from "react";
import { BACKGROUND_COLOR } from "../../Config/colors";

const TRANSPARENCY_HEX = "99";

export const Label = (props: { text: string; top: number; left: number }) => (
  <label
    style={{
      position: "absolute",
      top: props.top,
      left: props.left,
      background: `${BACKGROUND_COLOR}${TRANSPARENCY_HEX}`,
      padding: "1px 3px",
      marginTop: "1px",
      borderRadius: "0 3px 3px 0",
    }}
  >
    {props.text}
  </label>
);
