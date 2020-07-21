import { OpUnitType } from "dayjs";

export type GraphValue = {
  price: number;
  unix: number;
};

export type GraphValues = GraphValue[];

export type GraphPoints = {
  x: number;
  y: number;
  price: number;
  unix: number;
}[];

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

export type HistoricalData = {
  period: Period;
  values: GraphValues;
};

export type CanvasPoint = { canvasX: number; canvasY: number };
