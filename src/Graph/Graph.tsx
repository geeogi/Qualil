import React from "react";
import { scale2DCanvas } from "../2DCanvasUtils/canvasUtils";
import { drawLine, fillPath, getGradientMethod } from "../2DCanvasUtils/drawUtils";
import { PRIMARY_COLOR_2D_CANVAS, PRIMARY_COLOR_ALPHA_2D_CANVAS } from "../Config/colors";
import { GraphValues } from "../types";
import { getGraphConfig } from "../Universal/getGraphConfig";

export const Graph = (props: { values: GraphValues }) => {
  const { values } = props;
  const { points } = getGraphConfig({ values });

  const render = (canvasElement: HTMLCanvasElement) => {
    if (canvasElement) {
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

      // Utils to convert from graph coordinates to canvas pixels
      const toCanvasY = (graphY: number) => graphDepth - graphY;
      const toCanvasX = (graphX: number) => graphX;

      // Configure gradient
      const getGradient = getGradientMethod(ctx, 0, graphDepth);

      // Scale graph points to screen resolution
      const scaledPoints = points.map((point) => ({
        canvasX: toCanvasX(((point.x + 1) / 2) * graphWidth),
        canvasY: toCanvasY(((point.y + 1) / 2) * graphDepth),
      }));

      // Draw primary block
      fillPath(
        ctx,
        [
          { canvasX: toCanvasX(0), canvasY: toCanvasY(0) },
          ...scaledPoints,
          {
            canvasX: toCanvasX(graphWidth),
            canvasY: toCanvasY(0),
          },
        ],
        getGradient(PRIMARY_COLOR_ALPHA_2D_CANVAS(0.6), PRIMARY_COLOR_ALPHA_2D_CANVAS(0))
      );

      // Draw primary line
      drawLine(ctx, scaledPoints, PRIMARY_COLOR_2D_CANVAS);
    }
  };
  return <canvas ref={render}></canvas>;
};
