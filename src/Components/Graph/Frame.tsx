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
      border: `solid 1px ${AXIS_COLOUR}`,
      width: props.width + "px",
      height: props.height + "px",
    }}
  >
    {props.loading ? "loading..." : props.children}
  </div>
);
