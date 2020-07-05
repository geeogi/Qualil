import dayjs from "dayjs";
import React, { useState } from "react";
import { POSITIVE_COLOR, POSITIVE_COLOR_ALPHA } from "../Config/colors";
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
}) => {
  const [xLabels, setXLabels] = useState<JSX.Element[]>();
  const [yLabels, setYLabels] = useState<JSX.Element[]>();
  const [xGridLines, setXGridLines] = useState<JSX.Element[]>();
  const [yGridLines, setYGridLines] = useState<JSX.Element[]>();

  const onRender = (canvasElement: HTMLCanvasElement) => {
    if (!canvasElement || (xLabels && yLabels) || !props.values) {
      return;
    }

    const { values } = props;

    const {
      points,
      dateLabels,
      priceLabels,
      scalePriceY,
      scaleUnixX,
    } = getGraphConfig({ values });

    // Retrieve canvas context
    const ctx = canvasElement.getContext("2d");
    if (!ctx) {
      throw new Error("Unable to retrieve 2D context");
    }

    // Scale the canvas for retina displays
    scale2DCanvas(ctx, canvasElement);

    // Fetch the desired canvas height and width
    const height = canvasElement.offsetHeight;
    const width = canvasElement.offsetWidth;

    // Clear graph
    ctx.clearRect(0, 0, width, height);

    // Calculate graph dimensions
    const graphDepth = height;
    const graphWidth = width;

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
    const topColor = POSITIVE_COLOR_ALPHA(0.6);
    const bottomColor = POSITIVE_COLOR_ALPHA(0);
    const gradient = getGradient(topColor, bottomColor);
    fillPath(ctx, path, gradient);

    // Draw primary line
    drawLine(ctx, scaledPoints, POSITIVE_COLOR);

    // Set labels
    setYLabels(
      priceLabels.map((price) => (
        <Label
          key={price.toString()}
          text={price.toString()}
          top={toCanvasY(toGraphY(scalePriceY(price)))}
          left={0}
        />
      ))
    );
    setXLabels(
      dateLabels.map((unix) => (
        <Label
          key={unix}
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
          key={unix}
          left={toCanvasX(toGraphX(scaleUnixX(unix)))}
        />
      ))
    );
    setYGridLines(
      priceLabels.map((price) => (
        <HorizontalGridLine
          key={price.toString()}
          top={toCanvasY(toGraphY(scalePriceY(price)))}
        />
      ))
    );
  };

  return (
    <Frame width={props.width} height={props.height}>
      {xLabels}
      {xGridLines}
      {yLabels}
      {yGridLines}
      <canvas ref={onRender}></canvas>
    </Frame>
  );
};
