import React, { ReactNode } from "react";

export const Button = (props: {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
}) => (
  <button disabled={props.disabled} onClick={props.onClick}>
    {props.children}
  </button>
);
