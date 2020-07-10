import React from "react";
import { ATTRIBUTE_COLOUR } from "../../Config/colors";

export const Attribute = (props: { attrib: string; value: string }) => (
  <span className="small-font">
    <span style={{ color: ATTRIBUTE_COLOUR }}>{props.attrib}</span>{" "}
    {props.value}
  </span>
);
