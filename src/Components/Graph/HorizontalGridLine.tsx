import React from "react";
import { AXIS_COLOUR } from "../../Config/colors";

export const HorizontalGridLine = (props: { top: number }) => (
  <div
    style={{
      borderTop: `solid 1px ${AXIS_COLOUR}`,
      width: "100%",
      height: "1px",
      position: "absolute",
      top: props.top,
    }}
  ></div>
);
