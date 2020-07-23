import React from "react";

export const Gradient = (props: { color: string; symbol: string }) => {
  const id = `gradient-${props.symbol}`;
  const stopColor = props.color;
  return (
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor, stopOpacity: 0.55 }} />
        <stop offset="100%" style={{ stopColor, stopOpacity: 0 }} />
      </linearGradient>
    </defs>
  );
};
