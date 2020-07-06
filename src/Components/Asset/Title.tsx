import React from "react";
import { COLORS } from "../../Config/colors";

export const Title = (props: {
  name: string;
  currentPrice: number;
  dailyChange: number;
}) => {
  const { name, currentPrice, dailyChange } = props;

  const price24HoursAgo = currentPrice + dailyChange;
  const dailyChangeDivision = Math.abs(dailyChange / price24HoursAgo);
  const dailyChangePercent = Math.round(dailyChangeDivision * 10000) / 100;

  const { POSITIVE, NEGATIVE } = COLORS;
  const color = dailyChange >= 0 ? POSITIVE.COLOR : NEGATIVE.COLOR;
  const sign = dailyChange >= 0 ? "+" : "-";

  return (
    <h3>
      <span>
        {name} {currentPrice}{" "}
        <span style={{ color }}>
          {sign}
          {dailyChangePercent}%
        </span>
      </span>
    </h3>
  );
};
