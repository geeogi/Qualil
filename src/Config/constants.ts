import { Period } from "../Model/graph";

export const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";
export const CURRENCY = "usd";
export const UNIX_HOUR = 3600000;
export const COINS = [
  "bitcoin",
  "ethereum",
  "tether",
  "ripple",
  "bitcoin-cash",
  "bitcoin-cash-sv",
  "litecoin",
  "cardano",
  "binancecoin",
];
export const PERIODS: Period[] = [
  {
    value: "1",
    days: 1,
    title: "1d",
    step: { multiplier: 6, unit: "h", max: 3 },
    format: "HH:mm",
  },
  {
    value: "7",
    days: 7,
    title: "1w",
    step: { multiplier: 2, unit: "d", max: 3 },
    format: "D MMM",
  },
  {
    value: "30",
    days: 30,
    title: "1m",
    step: { multiplier: 1, unit: "w", max: 3 },
    format: "D MMM",
  },
  {
    value: "90",
    days: 90,
    title: "3m",
    step: { multiplier: 1, unit: "M", max: 3 },
    format: "MMM",
  },
  {
    value: "365",
    days: 365,
    title: "1y",
    step: { multiplier: 3, unit: "M", max: 3 },
    format: "MMM 'YY",
  },
  {
    value: "max",
    title: "All",
    step: { multiplier: 1, unit: "y", max: 7 },
    format: "'YY",
  },
];
