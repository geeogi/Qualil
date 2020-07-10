import React from "react";
import { AXIS_COLOUR } from "../../Config/colors";

export const HorizontalGridLine = (props: { top: number }) => (
  <div
    className="HorizontalGridLine"
    style={{ borderTop: `solid 1px ${AXIS_COLOUR}`, top: props.top }}
  ></div>
);
