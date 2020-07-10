import React from "react";
import { ATTRIBUTE_COLOUR, COLORS } from "../../Config/colors";
import { numberToString } from "../../Core/numberUtils";

export const Title = (props: {
  symbol: string;
  image: string;
  currentPrice: number;
  dailyChange: number;
  name: string;
}) => {
  const { symbol, image, name, currentPrice, dailyChange } = props;

  const price24HoursAgo = currentPrice + dailyChange;
  const dailyChangeDivision = Math.abs(dailyChange / price24HoursAgo);
  const dailyChangePercent = Math.round(dailyChangeDivision * 10000) / 100;

  const { POSITIVE, NEGATIVE } = COLORS;
  const color = dailyChange >= 0 ? POSITIVE.COLOR : NEGATIVE.COLOR;
  const sign = dailyChange >= 0 ? "+" : "-";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={image}
          alt={symbol}
          style={{ padding: "4px" }}
          width="33px"
          height="33px"
        ></img>
        <h3>
          {name} ${numberToString(currentPrice)}{" "}
        </h3>
        <span style={{ color, marginLeft: "8px" }}>
          {sign}
          {dailyChangePercent}%
        </span>
      </div>
      <p style={{ color: ATTRIBUTE_COLOUR, fontWeight: "bold" }}>{symbol}</p>
    </div>
  );
};
