import { COINGECKO_BASE_URL, CURRENCY } from "../Config/constants";
import { CoinHistory, CoinInfo } from "../Model/coin";

export const getCoinHistoricalData = async (coin: string, days: string) => {
  const url = `${COINGECKO_BASE_URL}/coins/${coin}/market_chart?vs_currency=${CURRENCY}&days=${days}`;
  const response = await fetch(url);
  const { prices }: CoinHistory = await response.json();
  return prices.map(([unix, price]) => ({ unix, price }));
};

export const getCoinInfo = async (coin: string) => {
  const url = `${COINGECKO_BASE_URL}/coins/${coin}`;
  const response = await fetch(url);
  return response.json() as Promise<CoinInfo>;
};
