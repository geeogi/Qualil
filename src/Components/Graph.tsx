import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../Config/colors";
import {
  handleMouseMove,
  handleTouchMove,
  handleTouchStart,
} from "../Core/eventUtils";
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
  loading?: boolean;
  width: number;
  height: number;
  period: Period;
  change: ChangeSince24H;
  symbol: string;
  activeValue: CanvasPoint | undefined;
  setActiveValue: (point: CanvasPoint | undefined) => void;
}) => {
  const [xLabels, setXLabels] = useState<{ unix: number; left: number }[]>();
  const [yLabels, setYLabels] = useState<{ price: number; top: number }[]>();
  const [points, setScaledPoints] = useState<CanvasPoint[]>();

  const svgRef = useRef<SVGSVGElement>(null);

  const {
    values,
    change,
    symbol,
    loading,
    width,
    height,
    period,
    activeValue,
    setActiveValue,
  } = props;

  // Use the active colour when in active state
  const color = activeValue ? COLORS.ACTIVE : COLORS[change];

  /**
   * Set up the graph when SVG element exists and whenever `values` changes
   */
  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement || !values) {
      return;
    }

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

    // Set labels
    setYLabels(
      priceLabels.map((price) => ({
        price,
        top: toCanvasY(toGraphY(scalePriceY(price))),
      }))
    );
    setXLabels(
      dateLabels.map((unix) => ({
        unix,
        left: toCanvasX(toGraphX(scaleUnixX(unix))),
      }))
    );

    // Set scaled points
    setScaledPoints(scaledPoints);
  }, [values, loading, svgRef, width, height, period, symbol, setActiveValue]);

  /**
   * Mouse/Touch handler
   * @param activeX
   */
  const handleActiveX = (activeX: number) => {
    if (points) {
      // Find nearest point to activeX
      const [canvasPoint] = [...points].sort(
        (a, b) => Math.abs(a.canvasX - activeX) - Math.abs(b.canvasX - activeX)
      );

      // Set active state
      setActiveValue(canvasPoint);
    }
  };

  return (
    <div className="relative non-select" style={{ height: height + 24 }}>
      <Frame width={width} height={height} loading={loading}>
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
          ref={svgRef}
          onMouseMove={(e) => handleActiveX(handleMouseMove(e).activeX)}
          onMouseLeave={() => setActiveValue(undefined)}
          onTouchStart={(e) => handleActiveX(handleTouchStart(e).activeX)}
          onTouchMove={(e) => handleActiveX(handleTouchMove(e).activeX)}
          onTouchEnd={() => setActiveValue(undefined)}
          onTouchCancel={() => setActiveValue(undefined)}
        >
          <defs>
            <Gradient symbol={symbol} color={color} />
          </defs>
          {points && (
            <Area
              symbol={symbol}
              height={height}
              width={width}
              points={points}
              color={color}
            />
          )}
        </svg>
      </Frame>
      {!loading &&
        xLabels?.map(({ unix, left }) => (
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
