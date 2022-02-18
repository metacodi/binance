/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quote-props */

const spotExchangeInfoLimits = [
  {
    rateLimitType: 'REQUEST_WEIGHT',
    interval: 'MINUTE',
    intervalNum: 1,
    limit: 1200
  },
  {
    rateLimitType: 'ORDERS',
    interval: 'SECOND',
    intervalNum: 10,
    limit: 50
  },
  {
    rateLimitType: 'ORDERS',
    interval: 'DAY',
    intervalNum: 1,
    limit: 160000
  },
  {
    rateLimitType: 'RAW_REQUESTS',
    interval: 'MINUTE',
    intervalNum: 5,
    limit: 6100
  }
];

const futuresExchangeInfoLimits = [
  {
    rateLimitType: 'REQUEST_WEIGHT',
    interval: 'MINUTE',
    intervalNum: 1,
    limit: 2400
  },
  {
    rateLimitType: 'ORDERS',
    interval: 'MINUTE',
    intervalNum: 1,
    limit: 1200
  },
  {
    rateLimitType: 'ORDERS',
    interval: 'SECOND',
    intervalNum: 10,
    limit: 300
  }
];

const WsMessageFuturesUserDataTradeUpdateEventFormatted = {
  "e": "ORDER_TRADE_UPDATE",     // Event Type
  "E": 1568879465651,            // Event Time
  "T": 1568879465650,            // Transaction Time
  "o": {
    "s": "BTCUSDT",              // Symbol
    "c": "TEST",                 // Client Order Id
    // special client order id:
    // starts with "autoclose-": liquidation order
    // "adl_autoclose": ADL auto close order
    "S": "SELL",                 // Side
    "o": "TRAILING_STOP_MARKET", // Order Type
    "f": "GTC",                  // Time in Force
    "q": "0.001",                // Original Quantity
    "p": "0",                    // Original Price
    "ap": "0",                   // Average Price
    "sp": "7103.04",             // Stop Price. Please ignore with TRAILING_STOP_MARKET order
    "x": "NEW",                  // Execution Type
    "X": "NEW",                  // Order Status
    "i": 8886774,                // Order Id
    "l": "0",                    // Order Last Filled Quantity
    "z": "0",                    // Order Filled Accumulated Quantity
    "L": "0",                    // Last Filled Price
    "N": "USDT",             // Commission Asset, will not push if no commission
    "n": "0",                // Commission, will not push if no commission
    "T": 1568879465651,          // Order Trade Time
    "t": 0,                      // Trade Id
    "b": "0",                    // Bids Notional
    "a": "9.91",                 // Ask Notional
    "m": false,                  // Is this trade the maker side?
    "R": false,                  // Is this reduce only
    "wt": "CONTRACT_PRICE",      // Stop Price Working Type
    "ot": "TRAILING_STOP_MARKET",    // Original Order Type
    "ps": "LONG",                        // Position Side
    "cp": false,                     // If Close-All, pushed with conditional order
    "AP": "7476.89",             // Activation Price, only puhed with TRAILING_STOP_MARKET order
    "cr": "5.0",                 // Callback Rate, only puhed with TRAILING_STOP_MARKET order
    "pP": false,              // ignore
    "si": 0,                  // ignore
    "ss": 0,                  // ignore
    "rp": "0"                            // Realized Profit of the trade
  }

};

const spotExchangeSymbolInfo = {

};


const futuresExchangeSymbolInfo = {
  "symbol": "BNBUSDT",
  "pair": "BNBUSDT",
  "contractType": "PERPETUAL",
  "deliveryDate": 4133404800000,
  "onboardDate": 1569398400000,
  "status": "TRADING",
  "maintMarginPercent": "2.5000",
  "requiredMarginPercent": "5.0000",
  "baseAsset": "BNB",
  "quoteAsset": "USDT",
  "marginAsset": "USDT",
  "pricePrecision": 3,
  "quantityPrecision": 2,
  "basePrecision": 8,
  "quotePrecision": 8,
  "underlyingType": "COIN",
  "underlyingSubType": [
    "BSC",
    "HOT"
  ],
  "settlePlan": 0,
  "triggerProtect": "0.0500",
  "liquidationFee": "0.010000",
  "marketTakeBound": "0.05",
  "filters": [
    {
      "minPrice": "6.600",
      "maxPrice": "100000",
      "filterType": "PRICE_FILTER",
      "tickSize": "0.010"
    },
    {
      "stepSize": "0.01",
      "filterType": "LOT_SIZE",
      "maxQty": "100000",
      "minQty": "0.01"
    },
    {
      "stepSize": "0.01",
      "filterType": "MARKET_LOT_SIZE",
      "maxQty": "1500",
      "minQty": "0.01"
    },
    {
      "limit": 200,
      "filterType": "MAX_NUM_ORDERS"
    },
    {
      "limit": 10,
      "filterType": "MAX_NUM_ALGO_ORDERS"
    },
    {
      "notional": "5",
      "filterType": "MIN_NOTIONAL"
    },
    {
      "multiplierDown": "0.9500",
      "multiplierUp": "1.0500",
      "multiplierDecimal": "4",
      "filterType": "PERCENT_PRICE"
    }
  ],
  "orderTypes": [
    "LIMIT",
    "MARKET",
    "STOP",
    "STOP_MARKET",
    "TAKE_PROFIT",
    "TAKE_PROFIT_MARKET",
    "TRAILING_STOP_MARKET"
  ],
  "timeInForce": [
    "GTC", // Nunca se cancelan, son las que usaremos nosotros
    "IOC",
    "FOK",
    "GTX"
  ]
};

const getAllOrdes = [
  {
    "avgPrice": "0.00000",
    "clientOrderId": "abc",
    "cumQuote": "0",
    "executedQty": "0",
    "orderId": 1917641,
    "origQty": "0.40",
    "origType": "TRAILING_STOP_MARKET",
    "price": "0",
    "reduceOnly": false,
    "side": "BUY",
    "positionSide": "SHORT",
    "status": "NEW",
    "stopPrice": "9300",                // please ignore when order type is TRAILING_STOP_MARKET
    "closePosition": false,   // if Close-All
    "symbol": "BTCUSDT",
    "time": 1579276756075,              // order time
    "timeInForce": "GTC",
    "type": "TRAILING_STOP_MARKET",
    "activatePrice": "9020",            // activation price, only return with TRAILING_STOP_MARKET order
    "priceRate": "0.3",                 // callback rate, only return with TRAILING_STOP_MARKET order
    "updateTime": 1579276756075,        // update time
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false            // if conditional order trigger is protected   
  }
];

const balnceUdate = [{
  spotuserdataevent: {
    eventType: 'balanceUpdate',
    eventTime: 1643349801648,
    asset: 'ANC',
    balanceDelta: -0.23014206,
    clearTime: 1643349801647,
    wsMarket: 'spot',
    wsKey: 'spot_userData__P5K1Rob0xjarDDUwQCus7qUlaFokLibGjgon623a0RqEzEdR3EEBRyEsgrYx'
  },
  formattedMsg: {
    "eventType": "balanceUpdate",
    "eventTime": 1643349801648,
    "asset": "BNB",
    "balanceDelta": 0.00081363,
    "clearTime": 1643349801647,
    "wsMarket": "spot",
    "wsKey": "spot_userData__P5K1Rob0xjarDDUwQCus7qUlaFokLibGjgon623a0RqEzEdR3EEBRyEsgrYx"
  },
  spotuserdataevent2: {
    eventType: 'balanceUpdate',
    eventTime: 1643349801648,
    asset: 'BNB',
    balanceDelta: 0.00081363,
    clearTime: 1643349801647,
    wsMarket: 'spot',
    wsKey: 'spot_userData__P5K1Rob0xjarDDUwQCus7qUlaFokLibGjgon623a0RqEzEdR3EEBRyEsgrYx'
  },
  formattedMsg2: {
    "eventType": "outboundAccountPosition",
    "eventTime": 1643349801648,
    "lastUpdateTime": 1643349801647,
    "balances": [
      {
        "asset": "BNB",
        "availableBalance": 0.0010888,
        "onOrderBalance": 0
      },
      {
        "asset": "ANC",
        "availableBalance": 0,
        "onOrderBalance": 0
      }
    ],
    "wsMarket": "spot",
    "wsKey": "spot_userData__P5K1Rob0xjarDDUwQCus7qUlaFokLibGjgon623a0RqEzEdR3EEBRyEsgrYx"
  },
  spotuserdataevent3: {
    eventType: 'outboundAccountPosition',
    eventTime: 1643349801648,
    lastUpdateTime: 1643349801647,
    balances: [
      { asset: 'BNB', availableBalance: 0.00299157, onOrderBalance: 0 },
      { asset: 'USDT', availableBalance: 28.1385, onOrderBalance: 0 },
      { asset: 'ETC', availableBalance: 0.00410788, onOrderBalance: 0 }
    ],
    wsMarket: 'spot',
    wsKey: 'spot_userData__P5K1Rob0xjarDDUwQCus7qUlaFokLibGjgon623a0RqEzEdR3EEBRyEsgrYx'
  }
}];

const limitSellFiledSpot = [{
  "formattedMsg": {
    "eventType": "executionReport",
    "eventTime": 1643559645974,
    "symbol": "ETCUSDT",
    "newClientOrderId": "1-2-1-3",
    "side": "SELL",
    "orderType": "LIMIT",
    "cancelType": "GTC",
    "quantity": 1.11,
    "price": 25.35,
    "stopPrice": 0,
    "icebergQuantity": 0,
    "orderListId": -1,
    "originalClientOrderId": "",
    "executionType": "TRADE",
    "orderStatus": "FILLED",
    "rejectReason": "NONE",
    "orderId": 2342935189,
    "lastTradeQuantity": 1.11,
    "accumulatedQuantity": 1.11,
    "lastTradePrice": 25.35,
    "commission": 0.00005529,
    "commissionAsset": "BNB",
    "tradeTime": 1643559645974,
    "tradeId": 128638884,
    "ignoreThis1": 4802135891,
    "isOrderOnBook": false,
    "isMaker": true,
    "ignoreThis2": true,
    "orderCreationTime": 1643559641577,
    "cumulativeQuoteAssetTransactedQty": 28.1385,
    "lastQuoteAssetTransactedQty": 28.1385,
    "orderQuoteQty": 0,
    "wsMarket": "spot",
    "wsKey": "spot_userData__j72ItN9ReHzXdekcXuqCxT2ZKEltSQ45ueHG4AyMA0JDylpAMZ3ab68XpfiU"
  },
  spotUserDataEvent: {
    eventType: 'executionReport',
    eventTime: 1643559645974,
    symbol: 'ETCUSDT',
    newClientOrderId: '1-2-1-3',
    side: 'SELL',
    orderType: 'LIMIT',
    cancelType: 'GTC',
    quantity: 1.11,
    price: 25.35,
    stopPrice: 0,
    icebergQuantity: 0,
    orderListId: -1,
    originalClientOrderId: '',
    executionType: 'TRADE',
    orderStatus: 'FILLED',
    rejectReason: 'NONE',
    orderId: 2342935189,
    lastTradeQuantity: 1.11,
    accumulatedQuantity: 1.11,
    lastTradePrice: 25.35,
    commission: 0.00005529,
    commissionAsset: 'BNB',
    tradeTime: 1643559645974,
    tradeId: 128638884,
    ignoreThis1: 4802135891,
    isOrderOnBook: false,
    isMaker: true,
    ignoreThis2: true,
    orderCreationTime: 1643559641577,
    cumulativeQuoteAssetTransactedQty: 28.1385,
    lastQuoteAssetTransactedQty: 28.1385,
    orderQuoteQty: 0,
    wsMarket: 'spot',
    wsKey: 'spot_userData__j72ItN9ReHzXdekcXuqCxT2ZKEltSQ45ueHG4AyMA0JDylpAMZ3ab68XpfiU'
  }
}];

const limitBuyNewSpot = [{
  formattedMsg:  {
    "eventType": "executionReport",
    "eventTime": 1643885086711,
    "symbol": "ETCUSDT",
    "newClientOrderId": "1-2-1-1",
    "side": "BUY",
    "orderType": "LIMIT",
    "cancelType": "GTC",
    "quantity": 1.92,
    "price": 20.92,
    "stopPrice": 0,
    "icebergQuantity": 0,
    "orderListId": -1,
    "originalClientOrderId": "",
    "executionType": "NEW",
    "orderStatus": "NEW",
    "rejectReason": "NONE",
    "orderId": 2349879093,
    "lastTradeQuantity": 0,
    "accumulatedQuantity": 0,
    "lastTradePrice": 0,
    "commission": 0,
    // "commissionAsset": null,
    "tradeTime": 1643885086711,
    "tradeId": -1,
    "ignoreThis1": 4816231931,
    "isOrderOnBook": true,
    "isMaker": false,
    "ignoreThis2": false,
    "orderCreationTime": 1643885086711,
    "cumulativeQuoteAssetTransactedQty": 0,
    "lastQuoteAssetTransactedQty": 0,
    "orderQuoteQty": 0,
    "wsMarket": "spot",
    "wsKey": "spot_userData__6JbdIxQaD00C7RIDRqmnyjgipc9hNXDTR4JpP22xDyU9UAnLIidbEknl6jCi"
  }
  
}];

const limitBuyFilledSpot = [{
  formattedMsg:  {
    "eventType": "executionReport",
    "eventTime": 1643885714538,
    "symbol": "ETCUSDT",
    "newClientOrderId": "1-2-1-1",
    "side": "BUY",
    "orderType": "LIMIT",
    "cancelType": "GTC",
    "quantity": 1.92,
    "price": 25.96,
    "stopPrice": 0,
    "icebergQuantity": 0,
    "orderListId": -1,
    "originalClientOrderId": "",
    "executionType": "TRADE",
    "orderStatus": "FILLED",
    "rejectReason": "NONE",
    "orderId": 2349890167,
    "lastTradeQuantity": 1.92,
    "accumulatedQuantity": 1.92,
    "lastTradePrice": 25.96,
    "commission": 0.00010353,
    "commissionAsset": "BNB",
    "tradeTime": 1643885714538,
    "tradeId": 128870503,
    "ignoreThis1": 4816254396,
    "isOrderOnBook": false,
    "isMaker": false,
    "ignoreThis2": true,
    "orderCreationTime": 1643885714538,
    "cumulativeQuoteAssetTransactedQty": 49.8432,
    "lastQuoteAssetTransactedQty": 49.8432,
    "orderQuoteQty": 0,
    "wsMarket": "spot",
    "wsKey": "spot_userData__6JbdIxQaD00C7RIDRqmnyjgipc9hNXDTR4JpP22xDyU9UAnLIidbEknl6jCi"
  }
  
}];
