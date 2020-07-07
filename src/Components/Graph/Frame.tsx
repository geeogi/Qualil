import React from "react";
import { AXIS_COLOUR } from "../../Config/colors";

export const Frame = (props: {
  children?: React.ReactNode;
  loading?: boolean;
  width: number;
  height: number;
}) => (
  <div
    style={{
      position: "relative",
      width: props.width + "px",
      height: props.height + "px",
      marginBottom: "24px",
    }}
  >
    {props.loading ? "loading..." : props.children}
  </div>
);
