import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../Config/colors";
import { scale2DCanvas } from "../Core/canvasUtils";
import { drawLine, fillPath, getGradientMethod } from "../Core/drawUtils";
import { addInteractivityHandlers } from "../Core/eventUtils";
import { getGraphConfig } from "../Core/graphUtils";
import { numberWithSignificantDigits } from "../Core/numberUtils";
import { ChangeSince24H } from "../Model/coin";
import { CanvasPoint, GraphValues, Period } from "../Model/graph";
import { ActiveCircle } from "./Graph/ActiveCircle";
import { ActiveLine } from "./Graph/ActiveLine";
import { Frame } from "./Graph/Frame";
import { HorizontalGridLine } from "./Graph/HorizontalGridLine";
import { Label } from "./Graph/Label";
import { VerticalGridLine } from "./Graph/VerticalGridLine";

export const Graph = (props: {
  values?: GraphValues;
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

  const canvasRef = useRef<HTMLCanvasElement>(null);

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
  const colors = activePoint ? COLORS.ACTIVE : COLORS[change];

  /**
   * Setup the graph when canvas loads and whenever `values` changes
   */
  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement || !values) {
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

    // Retrieve canvas context
    const ctx = canvasElement.getContext("2d");
    if (!ctx) {
      throw new Error("Unable to retrieve 2D context");
    }

    // Scale the canvas for retina displays
    scale2DCanvas(ctx, canvasElement);

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
          // Scale activeX to [-1,1]
          const activeClipSpaceX = (activeX / width) * 2 - 1;

          // Fetch nearest point to activeX
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
      canvasElement
    );

    // Unset labels and event listeners on cleanup
    return () => {
      setXLabels(undefined);
      setYLabels(undefined);
      cleanupInteractivityHandlers();
    };
  }, [
    values,
    loading,
    canvasRef,
    width,
    height,
    period,
    symbol,
    setActiveValue,
  ]);

  /**
   * Draw the graph every render
   */
  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement || !points) {
      return;
    }

    // Retrieve canvas context
    const ctx = canvasElement.getContext("2d");
    if (!ctx) {
      throw new Error("Unable to retrieve 2D context");
    }

    // Clear graph
    ctx.clearRect(0, 0, width, height);

    // Configure gradient util
    const getGradient = getGradientMethod(ctx, 0, height);

    // Draw primary block
    const firstPoint = { canvasX: 0, canvasY: height };
    const lastPoint = { canvasX: width, canvasY: height };
    const path = [firstPoint, ...points, lastPoint];
    const topColor = colors.COLOR_ALPHA(0.6);
    const bottomColor = colors.COLOR_ALPHA(0);
    const gradient = getGradient(topColor, bottomColor);
    fillPath(ctx, path, gradient);

    // Draw primary line
    drawLine(ctx, points, colors.COLOR, 2);
  }, [colors, points, width, height]);

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
            <ActiveLine
              left={activePoint.canvasX}
              color={colors.COLOR}
              width={1}
            />
            <ActiveCircle
              size={18}
              left={activePoint.canvasX}
              top={activePoint.canvasY}
              color={colors.COLOR}
            />
          </>
        )}
        <canvas ref={canvasRef}></canvas>
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
