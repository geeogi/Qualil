import React from "react";
import { AXIS_COLOUR } from "../../Config/colors";

export const VerticalGridLine = (props: { left: number }) => (
  <div
    className="VerticalGridLine"
    style={{ borderLeft: `solid 1px ${AXIS_COLOUR}`, left: props.left }}
  ></div>
);
