import React from "react";

export const Attribute = (props: { attrib: string; value: string }) => (
  <span className="small-font">
    <span className="attribute">{props.attrib}</span> {props.value}
  </span>
);
