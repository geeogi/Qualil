import React from "react";

export const Frame = (props: { children: React.ReactNode }) => (
  <div
    style={{
      position: "relative",
      border: "solid 1px red",
      width: "500px",
      height: "300px",
    }}
  >
    {props.children}
  </div>
);
