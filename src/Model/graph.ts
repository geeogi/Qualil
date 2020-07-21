import { OpUnitType } from "dayjs";

export type GraphValues = {
  price: number;
  unix: number;
}[];

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

export type ActiveValue = {
  price: number;
  unix: number;
};
