import { COINGECKO_BASE_URL, CURRENCY } from "../Config/constants";

export interface COINGECKO_COIN_INFO {
  market_data: {
    current_price: {
      [currency: string]: number;
    };
    price_change_24h_in_currency: {
      [currency: string]: number;
    };
    market_cap: {
      [currency: string]: number;
    };
  };
  image: {
    thumb: string;
  };
  name: string;
}

export interface COINGECKO_COIN_HISTORICAL {
  prices: number[][];
}

export const getCoinHistoricalData = async (coin: string, days: number) => {
  const url = `${COINGECKO_BASE_URL}/coins/${coin}/market_chart?vs_currency=${CURRENCY}&days=${days}`;
  const response = await fetch(url);
  const { prices }: COINGECKO_COIN_HISTORICAL = await response.json();
  return prices.map(([unix, price]) => ({ unix, price }));
};

export const getCoinInfo = async (coin: string) => {
  const url = `${COINGECKO_BASE_URL}/coins/${coin}`;
  const response = await fetch(url);
  return response.json() as Promise<COINGECKO_COIN_INFO>;
};
