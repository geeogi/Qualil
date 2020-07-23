import { OpUnitType } from "dayjs";

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

export type HistoricalValue = {
  price: number;
  unix: number;
};

export type HistoricalData = {
  period: Period;
  values: HistoricalValue[];
};

export type CanvasPoint = {
  canvasX: number;
  canvasY: number;
  x: number;
  y: number;
  price: number;
  unix: number;
};
