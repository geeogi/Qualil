import React from "react";
import { LoadingSpinner } from "../LoadingSpinner";

export const Frame = (props: {
  children?: React.ReactNode;
  loading?: boolean;
  width: number;
  height: number;
}) => (
  <div
    className="relative"
    style={{ width: props.width + "px", height: props.height + "px" }}
  >
    {props.loading ? <LoadingSpinner /> : props.children}
  </div>
);
