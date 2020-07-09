import React from "react";
import { BACKGROUND_COLOR } from "../../Config/colors";

export const ActiveCircle = (props: {
  color: string;
  top: number;
  left: number;
  size: number;
}) => (
  <div
    style={{
      position: "absolute",
      top: props.top - props.size / 2,
      left: props.left - props.size / 2,
      width: props.size + "px",
      height: props.size + "px",
      borderRadius: "50%",
      border: `solid 2px ${BACKGROUND_COLOR}`,
      background: props.color,
      zIndex: 2,
      pointerEvents: "none",
      userSelect: "none",
      touchAction: "none",
    }}
  ></div>
);
