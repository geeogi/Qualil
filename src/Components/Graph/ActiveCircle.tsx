import React from "react";
import { BACKGROUND_COLOR } from "../../Config/colors";

export const ActiveCircle = (props: {
  color: string;
  top: number;
  left: number;
}) => (
  <div
    style={{
      position: "absolute",
      top: props.top,
      left: props.left,
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      border: `solid 2px ${BACKGROUND_COLOR}`,
      background: props.color,
      zIndex: 2,
    }}
  ></div>
);
