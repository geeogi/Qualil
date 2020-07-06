import React from "react";
import { AXIS_COLOUR } from "../../Config/colors";

export const VerticalGridLine = (props: { left: number }) => (
  <div
    style={{
      borderLeft: `solid 1px ${AXIS_COLOUR}`,
      height: "100%",
      width: "1px",
      position: "absolute",
      left: props.left,
      zIndex: -1,
    }}
  ></div>
);
