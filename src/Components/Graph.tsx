import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../Config/colors";
import { Change } from "../Config/constants";
import { getGraphConfig } from "../Core/graphUtils";
import { GraphValues } from "../Model/graph";
import { scale2DCanvas } from "./Graph/2DCanvasUtils/canvasUtils";
import {
  drawLine,
  fillPath,
  getGradientMethod,
} from "./Graph/2DCanvasUtils/drawUtils";
import { Frame } from "./Graph/Frame";
import { HorizontalGridLine } from "./Graph/HorizontalGridLine";
import { Label } from "./Graph/Label";
import { VerticalGridLine } from "./Graph/VerticalGridLine";

export const Graph = (props: {
  values?: GraphValues;
  width: number;
  height: number;
  change: Change;
  name: string;
}) => {
  const [xLabels, setXLabels] = useState<JSX.Element[]>();
  const [yLabels, setYLabels] = useState<JSX.Element[]>();
  const [xGridLines, setXGridLines] = useState<JSX.Element[]>();
  const [yGridLines, setYGridLines] = useState<JSX.Element[]>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { values, change, name } = props;

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (!canvasElement || !values) {
      return;
    }

    const {
      points,
      dateLabels,
      priceLabels,
      scalePriceY,
      scaleUnixX,
    } = getGraphConfig({ values });

    const colors = COLORS[change];

    // Retrieve canvas context
    const ctx = canvasElement.getContext("2d");
    if (!ctx) {
      throw new Error("Unable to retrieve 2D context");
    }

    // Scale the canvas for retina displays
    scale2DCanvas(ctx, canvasElement);

    // Fetch the desired canvas height and width
    const canvasHeight = canvasElement.offsetHeight;
    const canvasWidth = canvasElement.offsetWidth;

    // Clear graph
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Calculate graph dimensions
    const graphDepth = canvasHeight;
    const graphWidth = canvasWidth;

    // Utils to convert from clip space [-1,1] to graph coordinates
    const toGraphX = (x: number) => ((x + 1) / 2) * graphWidth;
    const toGraphY = (y: number) => ((y + 1) / 2) * graphDepth;

    // Utils to convert from graph coordinates to canvas pixels
    const toCanvasX = (graphX: number) => graphX;
    const toCanvasY = (graphY: number) => graphDepth - graphY;

    // Configure gradient util
    const getGradient = getGradientMethod(ctx, 0, graphDepth);

    // Scale graph coordinates from clip space [-1,1] to screen resolution
    const scaledPoints = points.map((point) => ({
      canvasX: toCanvasX(toGraphX(point.x)),
      canvasY: toCanvasY(toGraphY(point.y)),
    }));

    // Draw primary block
    const firstPoint = { canvasX: toCanvasX(0), canvasY: toCanvasY(0) };
    const lastPoint = { canvasX: toCanvasX(graphWidth), canvasY: toCanvasY(0) };
    const path = [firstPoint, ...scaledPoints, lastPoint];
    const topColor = colors.COLOR_ALPHA(0.6);
    const bottomColor = colors.COLOR_ALPHA(0);
    const gradient = getGradient(topColor, bottomColor);
    fillPath(ctx, path, gradient);

    // Draw primary line
    drawLine(ctx, scaledPoints, colors.COLOR, 2);

    // Set labels
    setYLabels(
      priceLabels.map((price) => (
        <Label
          key={`${name}-${price.toString()}`}
          text={price.toString()}
          top={toCanvasY(toGraphY(scalePriceY(price)))}
          left={0}
        />
      ))
    );
    setXLabels(
      dateLabels.map((unix) => (
        <Label
          key={`${name}-${unix}`}
          text={dayjs(unix).format("D MMM")}
          top={graphDepth}
          left={toCanvasX(toGraphX(scaleUnixX(unix)))}
        />
      ))
    );

    // Set grid lines
    setXGridLines(
      dateLabels.map((unix) => (
        <VerticalGridLine
          key={`${name}-${unix}`}
          left={toCanvasX(toGraphX(scaleUnixX(unix)))}
        />
      ))
    );
    setYGridLines(
      priceLabels.map((price) => (
        <HorizontalGridLine
          key={`${name}-${price.toString()}`}
          top={toCanvasY(toGraphY(scalePriceY(price)))}
        />
      ))
    );
  }, [values]);

  return (
    <Frame width={props.width} height={props.height}>
      {xLabels}
      {xGridLines}
      {yLabels}
      {yGridLines}
      <canvas ref={canvasRef}></canvas>
    </Frame>
  );
};
