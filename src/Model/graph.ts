import { OpUnitType } from "dayjs";

export type GraphPoint = {
  x: number;
  y: number;
  price: number;
  unix: number;
};

export interface CanvasPoint extends GraphPoint {
  canvasX: number;
  canvasY: number;
}

export type Period = {
  title: string;
  value: string;
  days?: number;
  step: {
    multiplier: number;
    unit: OpUnitType;
    max: number;
  };
  labelFormat: string;
  scrubFormat: string;
};

export type HistoricalValue = {
  price: number;
  unix: number;
};

export type HistoricalData = {
  period: Period;
  values: HistoricalValue[];
};
