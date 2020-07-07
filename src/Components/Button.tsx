import React, { ReactNode } from "react";

export const Button = (props: {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
}) => (
  <button
    style={{ margin: "2px" }}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);
