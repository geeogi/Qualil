import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../Config/colors";
import { addInteractivityHandlers } from "../Core/eventUtils";
import { getGraphConfig } from "../Core/graphUtils";
import { numberWithSignificantDigits } from "../Core/numberUtils";
import { ChangeSince24H } from "../Model/coin";
import { CanvasPoint, HistoricalValue, Period } from "../Model/graph";
import { ActiveCircle } from "./Graph/ActiveCircle";
import { ActiveLine } from "./Graph/ActiveLine";
import { Frame } from "./Graph/Frame";
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
  setActiveValue: (active: { price: number; unix: number } | undefined) => void;
}) => {
  const [xLabels, setXLabels] = useState<{ unix: number; left: number }[]>();
  const [yLabels, setYLabels] = useState<{ price: number; top: number }[]>();
  const [points, setScaledPoints] = useState<CanvasPoint[]>();
  const [activePoint, setActivePoint] = useState<CanvasPoint>();

  const svgRef = useRef<SVGSVGElement>(null);

  const {
    values,
    change,
    symbol,
    loading,
    width,
    height,
    period,
    setActiveValue,
  } = props;

  // Use the active colour when in active state
  const color = activePoint ? COLORS.ACTIVE : COLORS[change];

  /**
   * Set up the graph when SVG loads and whenever `values` changes
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

    // Utils to convert from clip space [-1,1] to graph coordinates
    const toGraphX = (x: number) => ((x + 1) / 2) * width;
    const toGraphY = (y: number) => ((y + 1) / 2.2) * height + 12;

    // Utils to convert from graph coordinates to canvas pixels
    const toCanvasX = (graphX: number) => graphX;
    const toCanvasY = (graphY: number) => height - graphY;

    // Scale graph coordinates from clip space [-1,1] to screen resolution
    const scaledPoints = points.map((point) => ({
      canvasX: toCanvasX(toGraphX(point.x)),
      canvasY: toCanvasY(toGraphY(point.y)),
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

    // Add interactivity handlers
    const cleanupInteractivityHandlers = addInteractivityHandlers(
      ({ activeX }) => {
        if (activeX) {
          // Scale activeX to [-1,1] clip space
          const activeClipSpaceX = (activeX / width) * 2 - 1;

          // Find nearest point to activeX
          const [{ x, y, price, unix }] = [...points].sort(
            (a, b) =>
              Math.abs(a.x - activeClipSpaceX) -
              Math.abs(b.x - activeClipSpaceX)
          );

          // Set active state
          const canvasX = toCanvasX(toGraphX(x));
          const canvasY = toCanvasY(toGraphY(y));
          setActivePoint({ canvasX, canvasY });
          setActiveValue({ price, unix });
        } else {
          // Reset active state
          setActivePoint(undefined);
          setActiveValue(undefined);
        }
      },
      svgElement
    );

    // Unset labels and event listeners on cleanup
    return () => {
      setXLabels(undefined);
      setYLabels(undefined);
      cleanupInteractivityHandlers();
    };
  }, [values, loading, svgRef, width, height, period, symbol, setActiveValue]);

  // Reduce points to SVG points string
  const pointString = points
    ?.map((point) => `${point.canvasX},${point.canvasY}`)
    .join("\n");

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
        {activePoint && (
          <>
            <ActiveLine left={activePoint.canvasX} color={color} width={1} />
            <ActiveCircle
              size={18}
              left={activePoint.canvasX}
              top={activePoint.canvasY}
              color={color}
            />
          </>
        )}
        <svg viewBox={`0 0 ${width} ${height}`} ref={svgRef}>
          <defs>
            <linearGradient id={symbol} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: color, stopOpacity: 0.55 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: color, stopOpacity: 0 }}
              />
            </linearGradient>
          </defs>
          {points && (
            <>
              <polygon
                fill={`url(#${symbol}`}
                points={`0,${height}\n${pointString}\n${width},${height}`}
              />
              <polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                points={pointString}
              />
            </>
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
