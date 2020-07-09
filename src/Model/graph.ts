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
  step?: {
    multiplier: number;
    unit: OpUnitType;
    max: number;
  };
  format: string;
};
