import dayjs from "dayjs";
import React from "react";
import { CONTRAST_COLOUR } from "../../Config/colors";
import { numberToString } from "../../Core/numberUtils";
import { Period } from "../../Model/graph";

export const ActiveTitle = (props: {
  price: number;
  unix: number;
  image: string;
  name: string;
  period: Period;
}) => {
  const { price, unix, image, name, period } = props;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={image}
          alt={name}
          style={{ padding: "4px" }}
          width="33px"
          height="33px"
        ></img>
        <h3>${numberToString(price)}</h3>
      </div>
      <span style={{ color: CONTRAST_COLOUR, fontSize: "14px" }}>
        {dayjs(unix).format(period.scrubFormat)}
      </span>
    </div>
  );
};
