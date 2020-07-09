import dayjs from "dayjs";
import React from "react";
import { AXIS_COLOUR } from "../../Config/colors";
import { numberToString } from "../../Core/numberUtils";

export const ActiveTitle = (props: {
  price: number;
  unix: number;
  image: string;
  name: string;
}) => {
  const { price, unix, image, name } = props;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={image}
        alt={name}
        style={{ padding: "4px" }}
        width="33px"
        height="33px"
      ></img>
      <h3
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          {name} ${numberToString(price)}{" "}
        </div>
        <div style={{ color: AXIS_COLOUR }}>
          {dayjs(unix).format("HH:mm D MMM 'YY")}
        </div>
      </h3>
    </div>
  );
};
