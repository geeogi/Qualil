import { COINGECKO_BASE_URL, CURRENCY } from "../Config/constants";

const USE_OFFLINE = false;

interface COINGECKO_GENERAL_RESPONSE {
  market_data: {
    current_price: {
      [currency: string]: number;
    };
    price_change_24h_in_currency: {
      usd: number;
    };
  };
  name: string;
}

interface COINGECKO_HISTORICAL_RESPONSE {
  prices: number[][];
}

const MOCK_GENERAL_DATA: COINGECKO_GENERAL_RESPONSE = {
  market_data: {
    current_price: {
      usd: 9108,
    },
    price_change_24h_in_currency: {
      usd: -94.9047106207,
    },
  },
  name: "Bitcoin",
};

const MOCK_HISTORICAL_DATA: COINGECKO_HISTORICAL_RESPONSE = {
  prices: [
    [1585094400000, 6730.173782371188],
    [1585180800000, 6695.9006183977235],
    [1585267200000, 6765.56207892991],
    [1585353600000, 6397.826328325604],
    [1585440000000, 6255.000398693634],
    [1585526400000, 5915.337154791903],
    [1585612800000, 6403.141235565223],
    [1585699200000, 6421.70541388854],
    [1585785600000, 6640.797666310131],
    [1585872000000, 6807.897017890566],
    [1585958400000, 6732.852018394612],
    [1586044800000, 6859.424923721944],
    [1586131200000, 6788.048272605917],
    [1586217600000, 7297.635558289496],
    [1586304000000, 7196.782202442051],
    [1586390400000, 7342.291601148024],
    [1586476800000, 7294.488875121554],
    [1586563200000, 6864.694257006497],
    [1586649600000, 6878.781212589853],
    [1586736000000, 6913.158787469097],
    [1586822400000, 6857.538537511484],
    [1586908800000, 6860.17853570111],
    [1586995200000, 6629.431738031291],
    [1587081600000, 7059.92622475854],
    [1587168000000, 7035.261503989225],
    [1587254400000, 7242.5109294929825],
    [1587340800000, 7127.511949689152],
    [1587427200000, 6856.456278354705],
    [1587513600000, 6842.038597634602],
    [1587600000000, 7109.995291181778],
    [1587686400000, 7382.793144116689],
    [1587772800000, 7495.393587498606],
    [1587859200000, 7538.557687279841],
    [1587945600000, 7683.867415083342],
    [1588032000000, 7774.281554448049],
    [1588118400000, 7758.230255185947],
    [1588204800000, 8744.430287016561],
    [1588291200000, 8610.63580374089],
    [1588377600000, 8824.818413551968],
    [1588464000000, 8966.307014689282],
    [1588550400000, 8888.671912686868],
    [1588636800000, 8884.407813577056],
    [1588723200000, 9003.240557621584],
    [1588809600000, 9144.68703972007],
    [1588896000000, 9959.166416261767],
    [1588982400000, 9821.81131529702],
    [1589068800000, 9566.777187205966],
    [1589155200000, 8752.617087745832],
    [1589241600000, 8604.75159101983],
    [1589328000000, 8788.466749414652],
    [1589414400000, 9283.08601265873],
    [1589500800000, 9796.494527024528],
    [1589587200000, 9309.29535940684],
    [1589673600000, 9375.29710843331],
    [1589760000000, 9666.32719340344],
    [1589846400000, 9708.439858793108],
    [1589932800000, 9760.198937162193],
    [1590019200000, 9526.50759300584],
    [1590105600000, 9059.962506871727],
    [1590192000000, 9131.767275081993],
    [1590278400000, 9170.361063506127],
    [1590364800000, 8731.848525870651],
    [1590451200000, 8883.691769863415],
    [1590537600000, 8839.130663273247],
    [1590624000000, 9174.118563996424],
    [1590710400000, 9546.04563503715],
    [1590796800000, 9427.120373393418],
    [1590883200000, 9662.70587254818],
    [1590969600000, 9466.961781429516],
    [1591056000000, 10167.93069332851],
    [1591142400000, 9515.243858655718],
    [1591228800000, 9645.227869360308],
    [1591315200000, 9776.20299178848],
    [1591401600000, 9636.965527050057],
    [1591488000000, 9662.858709002241],
    [1591574400000, 9738.603356828593],
    [1591660800000, 9773.02951309516],
    [1591747200000, 9767.00531665552],
    [1591833600000, 9874.898681832236],
    [1591920000000, 9325.996856202635],
    [1592006400000, 9469.533297509908],
    [1592092800000, 9469.473456163696],
    [1592179200000, 9345.960907722063],
    [1592265600000, 9431.719262201745],
    [1592352000000, 9524.92661691022],
    [1592438400000, 9463.361414311787],
    [1592524800000, 9399.767217129216],
    [1592611200000, 9312.780104497786],
    [1592697600000, 9360.247968201687],
    [1592784000000, 9298.360829121417],
    [1592870400000, 9678.683208975835],
    [1592956800000, 9624.684291831398],
    [1593043200000, 9288.061774486938],
    [1593129600000, 9258.667161007706],
    [1593216000000, 9166.486360416233],
    [1593302400000, 9013.90556467614],
    [1593388800000, 9139.903276297824],
    [1593475200000, 9185.166540651147],
    [1593561600000, 9149.721996758017],
    [1593648000000, 9230.672998590804],
    [1593705354000, 9086.677098117943],
  ],
};

export const historicalData = async (coin: string, days: number) => {
  if (USE_OFFLINE) {
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    await delay(Math.random() * 1500);
    const { prices }: COINGECKO_HISTORICAL_RESPONSE = MOCK_HISTORICAL_DATA;
    return prices.map(([unix, price]) => ({ unix, price }));
  } else {
    const url = `${COINGECKO_BASE_URL}/coins/${coin}/market_chart?vs_currency=${CURRENCY}&days=${days}`;
    const response = await fetch(url);
    const { prices }: COINGECKO_HISTORICAL_RESPONSE = await response.json();
    return prices.map(([unix, price]) => ({ unix, price }));
  }
};

export const generalData = async (coin: string) => {
  if (USE_OFFLINE) {
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    await delay(Math.random() * 1500);
    const { name, market_data }: COINGECKO_GENERAL_RESPONSE = MOCK_GENERAL_DATA;
    return { name, market_data };
  } else {
    const url = `${COINGECKO_BASE_URL}/coins/${coin}`;
    const response = await fetch(url);
    const {
      name,
      market_data,
    }: COINGECKO_GENERAL_RESPONSE = await response.json();
    return { name, market_data };
  }
};
