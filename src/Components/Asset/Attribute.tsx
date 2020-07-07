import React from "react";
import { ATTRIBUTE_COLOUR } from "../../Config/colors";

export const Attribute = (props: { attrib: string; value: string }) => (
  <p style={{ padding: "0px", margin: "0px" }}>
    <span style={{ color: ATTRIBUTE_COLOUR }}>{props.attrib}</span>:{" "}
    {props.value}
  </p>
);
