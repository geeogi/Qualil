export interface ValueByCurrency {
  [currency: string]: number;
}

export interface CoinInfo {
  market_data: {
    current_price: ValueByCurrency;
    price_change_24h_in_currency: ValueByCurrency;
    market_cap: ValueByCurrency;
    ath: ValueByCurrency;
    atl: ValueByCurrency;
    total_volume: ValueByCurrency;
  };
  image: { small: string };
  name: string;
  symbol: string;
}

export interface CoinHistory {
  prices: number[][];
}

export enum ChangeSince24H {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
}
