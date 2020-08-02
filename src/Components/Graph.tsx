import dayjs from "dayjs";
import React, { useState } from "react";
import { COLORS } from "../Config/colors";
import {
  getCoordinatesOfMouseEvent,
  getCoordinatesOfTouchEvent,
} from "../Core/domUtils";
import { getGraphConfig } from "../Core/graphUtils";
import { numberWithSignificantDigits } from "../Core/numberUtils";
import { ChangeSince24H } from "../Model/coin";
import { CanvasPoint, HistoricalValue, Period } from "../Model/graph";
import { ActiveCircle } from "./Graph/ActiveCircle";
import { ActiveLine } from "./Graph/ActiveLine";
import { Area } from "./Graph/Area";
import { Frame } from "./Graph/Frame";
import { Gradient } from "./Graph/Gradient";
import { HorizontalGridLine } from "./Graph/HorizontalGridLine";
import { Label } from "./Graph/Label";
import { VerticalGridLine } from "./Graph/VerticalGridLine";

export const Graph = (props: {
  values?: HistoricalValue[];
  period?: Period;
  width: number;
  height: number;
  symbol: string;
  activeValue: CanvasPoint | undefined;
  setActiveValue: (point: CanvasPoint | undefined) => void;
}) => {
  const [touched, setTouched] = useState(false);

  const {
    values,
    symbol,
    width,
    height,
    period,
    activeValue,
    setActiveValue,
  } = props;

  /**
   * Show loading spinner if either values or period is undefined
   */
  if (!values || !period) {
    return (
      <div className="relative non-select" style={{ height: height + 24 }}>
        <Frame width={width} height={height} loading={true}></Frame>
      </div>
    );
  }

  // Calculate change direction
  const positivePeriod = values[0].price < values[values.length - 1].price;
  const { POSITIVE, NEGATIVE } = ChangeSince24H;
  const change = positivePeriod ? POSITIVE : NEGATIVE;

  // Use the active colour when in active state
  const color = activeValue ? COLORS.ACTIVE : COLORS[change];

  // Sample values to achieve ~1 point per pixel
  const sample = values.filter(
    (_, index) => index % Math.ceil(values.length / width) === 0
  );

  // Configure graph values
  const {
    points,
    dateLabels,
    priceLabels,
    scalePriceY,
    scaleUnixX,
  } = getGraphConfig({ values: sample, period });

  // Utils to convert from clip space [-1,1] to graph coordinates [x,y]
  const toGraphX = (x: number) => ((x + 1) / 2) * width;
  const toGraphY = (y: number) => ((y + 1) / 2.2) * height + 12;

  // Utils to convert from graph coordinates [x,y] to canvas pixels [x,^y]
  const toCanvasX = (graphX: number) => graphX;
  const toCanvasY = (graphY: number) => height - graphY;

  // Scale graph coordinates from clip space [-1,1] to screen resolution
  const scaledPoints = points.map((point) => ({
    canvasX: toCanvasX(toGraphX(point.x)),
    canvasY: toCanvasY(toGraphY(point.y)),
    ...point,
  }));

  // Define labels
  const yLabels = priceLabels.map((price) => ({
    price,
    top: toCanvasY(toGraphY(scalePriceY(price))),
  }));

  const xLabels = dateLabels.map((unix) => ({
    unix,
    left: toCanvasX(toGraphX(scaleUnixX(unix))),
  }));

  /**
   * Interaction handler
   * @param activeX
   */
  const handleActiveX = (activeX: number) => {
    if (scaledPoints) {
      // Find nearest point to activeX
      const [canvasPoint] = [...scaledPoints].sort(
        (a, b) => Math.abs(a.canvasX - activeX) - Math.abs(b.canvasX - activeX)
      );

      // Set active state
      setActiveValue(canvasPoint);
    }
  };

  /**
   * Touch handler: `touched` state prevents double firing on touch devices
   */
  const handleTouch = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!touched) {
      setTouched(true);
    }
    handleActiveX(getCoordinatesOfTouchEvent(e).x);
  };

  /**
   * Mouse handler
   */
  const handleMouse = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!touched) {
      handleActiveX(getCoordinatesOfMouseEvent(e).x);
    }
  };

  /**
   * Leave handler
   */
  const handleLeave = () => {
    setActiveValue(undefined);
  };

  return (
    <div className="relative non-select" style={{ height: height + 24 }}>
      <Frame width={width} height={height}>
        {xLabels?.map(({ left, unix }) => (
          <VerticalGridLine left={left} key={`${symbol}-${unix.toString()}`} />
        ))}
        {yLabels?.map(({ top, price }) => (
          <HorizontalGridLine top={top} key={`${symbol}-${price.toString()}`} />
        ))}
        {yLabels?.map(({ price, top }) => (
          <Label
            key={`${symbol}-${price.toString()}`}
            text={numberWithSignificantDigits(price)}
            top={top}
            left={0}
          />
        ))}
        {activeValue && (
          <>
            <ActiveLine left={activeValue.canvasX} color={color} width={1} />
            <ActiveCircle
              size={18}
              left={activeValue.canvasX}
              top={activeValue.canvasY}
              color={color}
            />
          </>
        )}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          onMouseMove={handleMouse}
          onTouchStart={handleTouch}
          onTouchMove={handleTouch}
          onMouseLeave={handleLeave}
          onTouchEnd={handleLeave}
          onTouchCancel={handleLeave}
        >
          <defs>
            <Gradient symbol={symbol} color={color} />
          </defs>
          {points && (
            <Area
              symbol={symbol}
              height={height}
              width={width}
              points={scaledPoints}
              color={color}
            />
          )}
        </svg>
      </Frame>
      {xLabels?.map(({ unix, left }) => (
        <Label
          key={`${symbol}-${unix.toString()}`}
          text={dayjs(unix).format(period.labelFormat)}
          top={height}
          left={left}
        />
      ))}
    </div>
  );
};
