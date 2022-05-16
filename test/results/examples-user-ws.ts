
// ---------------------------------------------------------------------------------------------------
//  balanceUpdate
// ---------------------------------------------------------------------------------------------------

const rawUserbalanceUpdate = {
  "e": "balanceUpdate",
  "E": 1644147237972,
  "a": "USDT",
  "d": "-6000.00000000",
  "T": 1644147237971
};

const streamUserBalanceUpdate = {
  "stream": "WZe8ki9e84B2b4D0CxYZaYzOaqdX3o87INYoOKzegjuqichgoZIhAXpjnOTa",
  "data": {
    "e": "balanceUpdate",
    "E": 1644147237972,
    "a": "USDT",
    "d": "-6000.00000000",
    "T": 1644147237971
  }
}


const ACCOUNT_UPDATE = {
  "e": "ACCOUNT_UPDATE",
  "T": 1644174593525,
  "E": 1644174593531,
  "a": {
    "B": [{
      "a": "USDT",
      "wb": "200",
      "cw": "200",
      "bc": "100"
    }],
    "P": [],
    "m": "DEPOSIT"
  }
};

const ACCOUNT_UPDATE_WITHDRAW = {
  "e": "ACCOUNT_UPDATE",
  "T": 1644174716768,
  "E": 1644174716773,
  "a": {
    "B": [{
      "a": "USDT",
      "wb": "100",
      "cw": "100",
      "bc": "-100"
    }],
    "P": [],
    "m": "WITHDRAW"
  }
};


// ---------------------------------------------------------------------------------------------------
//  outboundAccountPosition
// ---------------------------------------------------------------------------------------------------

const rawUserOutboundAccountPosition = {
  "e": "outboundAccountPosition",
  "E": 1644147237972,
  "u": 1644147237971,
  "B": [{
    "a": "USDT",
    "f": "857.10000000",
    "l": "0.00000000"
  }]
};

const streamUserOutboundAccountPosition =
{
  "stream": "WZe8ki9e84B2b4D0CxYZaYzOaqdX3o87INYoOKzegjuqichgoZIhAXpjnOTa",
  "data": {
    "e": "outboundAccountPosition",
    "E": 1644147237972,
    "u": 1644147237971,
    "B": [{
      "a": "USDT",
      "f": "857.10000000",
      "l": "0.00000000"
    }]
  }
};


// ---------------------------------------------------------------------------------------------------
//  executionReport
// ---------------------------------------------------------------------------------------------------

const rawUserExecutionReport = {
  "e": "executionReport",
  "E": 1644147582164,
  "s": "BNBUSDT",
  "c": "web_5923eef0149e460badb58ad69e220c25",
  "S": "BUY",
  "o": "LIMIT",
  "f": "GTC",
  "q": "1.00000000",
  "p": "300.00000000",
  "P": "0.00000000",
  "F": "0.00000000",
  "g": -1,
  "C": "",
  "x": "NEW",
  "X": "NEW",
  "r": "NONE",
  "i": 3655358926,
  "l": "0.00000000",
  "z": "0.00000000",
  "L": "0.00000000",
  "n": "0",
  "N": null,
  "T": 1644147582164,
  "t": -1,
  "I": 7806412524,
  "w": true,
  "m": false,
  "M": false,
  "O": 1644147582164,
  "Z": "0.00000000",
  "Y": "0.00000000",
  "Q": "0.00000000"
};

const streamUserExecutionReport = {
  "stream": "WZe8ki9e84B2b4D0CxYZaYzOaqdX3o87INYoOKzegjuqichgoZIhAXpjnOTa",
  "data": {
    "e": "executionReport",
    "E": 1644147582164,
    "s": "BNBUSDT",
    "c": "web_5923eef0149e460badb58ad69e220c25",
    "S": "BUY",
    "o": "LIMIT",
    "f": "GTC",
    "q": "1.00000000",
    "p": "300.00000000",
    "P": "0.00000000",
    "F": "0.00000000",
    "g": -1,
    "C": "",
    "x": "NEW",
    "X": "NEW",
    "r": "NONE",
    "i": 3655358926,
    "l": "0.00000000",
    "z": "0.00000000",
    "L": "0.00000000",
    "n": "0",
    "N": null,
    "T": 1644147582164,
    "t": -1,
    "I": 7806412524,
    "w": true,
    "m": false,
    "M": false,
    "O": 1644147582164,
    "Z": "0.00000000",
    "Y": "0.00000000",
    "Q": "0.00000000"
  }
};


// ---------------------------------------------------------------------------------------------------
//  executionReport : SPOT buy market 10 USDT with BaseComission
// ---------------------------------------------------------------------------------------------------

const streamUserSpotBuyMarket_New_with_BaseCommission = {
  eventType: 'executionReport',
  eventTime: 1645178250950,
  symbol: 'BNBUSDT',
  newClientOrderId: 'web_013af71d482f41009e5addeb0b9c42fc',
  side: 'BUY',
  orderType: 'MARKET',
  cancelType: 'GTC',
  quantity: 0.024,
  price: 0,
  stopPrice: 0,
  icebergQuantity: 0,
  orderListId: -1,
  originalClientOrderId: '',
  executionType: 'NEW',
  orderStatus: 'NEW',
  rejectReason: 'NONE',
  orderId: 3700084399,
  lastTradeQuantity: 0,
  accumulatedQuantity: 0,
  lastTradePrice: 0,
  commission: 0,
  commissionAsset: null,
  tradeTime: 1645178250949,
  tradeId: -1,
  ignoreThis1: 7900845622,
  isOrderOnBook: true,
  isMaker: false,
  ignoreThis2: false,
  orderCreationTime: 1645178250949,
  cumulativeQuoteAssetTransactedQty: 0,
  lastQuoteAssetTransactedQty: 0,
  orderQuoteQty: 10
}

const streamUserSpotBuyMarket_Filled_with_BaseCommission = {
  eventType: 'executionReport',
  eventTime: 1645178250950,
  symbol: 'BNBUSDT',
  newClientOrderId: 'web_013af71d482f41009e5addeb0b9c42fc',
  side: 'BUY',
  orderType: 'MARKET',
  cancelType: 'GTC',
  quantity: 0.024,
  price: 0,
  stopPrice: 0,
  icebergQuantity: 0,
  orderListId: -1,
  originalClientOrderId: '',
  executionType: 'TRADE',
  orderStatus: 'FILLED',
  rejectReason: 'NONE',
  orderId: 3700084399,
  lastTradeQuantity: 0.024,
  accumulatedQuantity: 0.024,  // base quantity
  lastTradePrice: 409.4,
  commission: 0.000018,
  commissionAsset: 'BNB',
  tradeTime: 1645178250949,
  tradeId: 518527309,
  ignoreThis1: 7900845623,
  isOrderOnBook: false,
  isMaker: false,
  ignoreThis2: true,
  orderCreationTime: 1645178250949,
  cumulativeQuoteAssetTransactedQty: 9.8256,  // quote quantity
  lastQuoteAssetTransactedQty: 9.8256,
  orderQuoteQty: 10
}

const streamUserSpotBuyMarket_accountUpdate_with_BaseCommission = {
  eventType: 'outboundAccountPosition',
  eventTime: 1645178250950,
  lastAccountUpdateTime: 1645178250949,
  balances: [
    { asset: 'BNB', free: 15.38944925, locked: 0 },
    { asset: 'USDT', free: 2047.2744, locked: 300 }
  ]
}


// ---------------------------------------------------------------------------------------------------
//  executionReport : SPOT buy market 10 USDT with QuoteComission
// ---------------------------------------------------------------------------------------------------

const streamUserSpotBuyMarket_New_with_QuoteCommission = {
  eventType: 'executionReport',
  eventTime: 1645179319143,
  symbol: 'BNBUSDT',
  newClientOrderId: 'web_09ac6414346347d0952ed67b0b4e995b',
  side: 'BUY',
  orderType: 'MARKET',
  cancelType: 'GTC',
  quantity: 0.024,
  price: 0,
  stopPrice: 0,
  icebergQuantity: 0,
  orderListId: -1,
  originalClientOrderId: '',
  executionType: 'NEW',
  orderStatus: 'NEW',
  rejectReason: 'NONE',
  orderId: 3700126776,
  lastTradeQuantity: 0,
  accumulatedQuantity: 0,
  lastTradePrice: 0,
  commission: 0,
  commissionAsset: null,
  tradeTime: 1645179319142,
  tradeId: -1,
  ignoreThis1: 7900934534,
  isOrderOnBook: true,
  isMaker: false,
  ignoreThis2: false,
  orderCreationTime: 1645179319142,
  cumulativeQuoteAssetTransactedQty: 0,
  lastQuoteAssetTransactedQty: 0,
  orderQuoteQty: 10
}

const streamUserSpotBuyMarket_Filled_with_QuoteCommission = {
  eventType: 'executionReport',
  eventTime: 1645179319143,
  symbol: 'BNBUSDT',
  newClientOrderId: 'web_09ac6414346347d0952ed67b0b4e995b',
  side: 'BUY',
  orderType: 'MARKET',
  cancelType: 'GTC',
  quantity: 0.024,
  price: 0,
  stopPrice: 0,
  icebergQuantity: 0,
  orderListId: -1,
  originalClientOrderId: '',
  executionType: 'TRADE',
  orderStatus: 'FILLED',
  rejectReason: 'NONE',
  orderId: 3700126776,
  lastTradeQuantity: 0.024,
  accumulatedQuantity: 0.024,
  lastTradePrice: 408.1,
  commission: 0.000024,
  commissionAsset: 'BNB',
  tradeTime: 1645179319142,
  tradeId: 518531422,
  ignoreThis1: 7900934535,
  isOrderOnBook: false,
  isMaker: false,
  ignoreThis2: true,
  orderCreationTime: 1645179319142,
  cumulativeQuoteAssetTransactedQty: 9.7944,
  lastQuoteAssetTransactedQty: 9.7944,
  orderQuoteQty: 10
}

const streamUserSpotBuyMarket_accountUpdate_with_QuoteCommission = {
  eventType: 'outboundAccountPosition',
  eventTime: 1645179319143,
  lastAccountUpdateTime: 1645179319142,
  balances: [
    { asset: 'BNB', free: 15.38840652, locked: 0 },
    { asset: 'USDT', free: 2047.6925, locked: 300 }
  ]
}



// ---------------------------------------------------------------------------------------------------
//  executionReport : SPOT sell market 0,025 BNB with BaseComission
// ---------------------------------------------------------------------------------------------------

const streamUserSpotSellMarket_New_with_BaseComission = {
  eventType: 'executionReport',
  eventTime: 1645178708055,
  symbol: 'BNBUSDT',
  newClientOrderId: 'web_3ebe480b7f5d4c489268f181b7b4d5d0',
  side: 'SELL',
  orderType: 'MARKET',
  cancelType: 'GTC',
  quantity: 0.025,
  price: 0,
  stopPrice: 0,
  icebergQuantity: 0,
  orderListId: -1,
  originalClientOrderId: '',
  executionType: 'NEW',
  orderStatus: 'NEW',
  rejectReason: 'NONE',
  orderId: 3700100134,
  lastTradeQuantity: 0,
  accumulatedQuantity: 0,
  lastTradePrice: 0,
  commission: 0,
  commissionAsset: null,
  tradeTime: 1645178708055,
  tradeId: -1,
  ignoreThis1: 7900878528,
  isOrderOnBook: true,
  isMaker: false,
  ignoreThis2: false,
  orderCreationTime: 1645178708055,
  cumulativeQuoteAssetTransactedQty: 0,
  lastQuoteAssetTransactedQty: 0,
  orderQuoteQty: 0
}

const streamUserSpotSellMarket_Filled_with_BaseComission = {
  eventType: 'executionReport',
  eventTime: 1645178708055,
  symbol: 'BNBUSDT',
  newClientOrderId: 'web_3ebe480b7f5d4c489268f181b7b4d5d0',
  side: 'SELL',
  orderType: 'MARKET',
  cancelType: 'GTC',
  quantity: 0.025,
  price: 0,
  stopPrice: 0,
  icebergQuantity: 0,
  orderListId: -1,
  originalClientOrderId: '',
  executionType: 'TRADE',
  orderStatus: 'FILLED',
  rejectReason: 'NONE',
  orderId: 3700100134,
  lastTradeQuantity: 0.025,
  accumulatedQuantity: 0.025,  // base quantity
  lastTradePrice: 408.5,
  commission: 0.00001873,
  commissionAsset: 'BNB',
  tradeTime: 1645178708055,
  tradeId: 518528714,
  ignoreThis1: 7900878529,
  isOrderOnBook: false,
  isMaker: false,
  ignoreThis2: true,
  orderCreationTime: 1645178708055,
  cumulativeQuoteAssetTransactedQty: 10.2125, // quote quantity
  lastQuoteAssetTransactedQty: 10.2125,
  orderQuoteQty: 0
}

const streamUserSpotSellMarket_accountUpdate_with_BaseComission = {
  eventType: 'outboundAccountPosition',
  eventTime: 1645178708055,
  lastAccountUpdateTime: 1645178708055,
  balances: [
    { asset: 'BNB', free: 15.36443052, locked: 0 },
    { asset: 'USDT', free: 2057.4869, locked: 300 }
  ]
}


// ---------------------------------------------------------------------------------------------------
//  executionReport : SPOT sell market 0,025 BNB with QuoteComission
// ---------------------------------------------------------------------------------------------------

const streamUserSpotSellMarket_New_with_QuoteComission = {
  eventType: 'executionReport',
  eventTime: 1645179366291,
  symbol: 'BNBUSDT',
  newClientOrderId: 'web_809bc732660c4c9ab2c8f244d3ded348',
  side: 'SELL',
  orderType: 'MARKET',
  cancelType: 'GTC',
  quantity: 0.025,
  price: 0,
  stopPrice: 0,
  icebergQuantity: 0,
  orderListId: -1,
  originalClientOrderId: '',
  executionType: 'NEW',
  orderStatus: 'NEW',
  rejectReason: 'NONE',
  orderId: 3700128501,
  lastTradeQuantity: 0,
  accumulatedQuantity: 0,
  lastTradePrice: 0,
  commission: 0,
  commissionAsset: null,
  tradeTime: 1645179366290,
  tradeId: -1,
  ignoreThis1: 7900938141,
  isOrderOnBook: true,
  isMaker: false,
  ignoreThis2: false,
  orderCreationTime: 1645179366290,
  cumulativeQuoteAssetTransactedQty: 0,
  lastQuoteAssetTransactedQty: 0,
  orderQuoteQty: 0
}

const streamUserSpotSellMarket_Filled_with_QuoteComission = {
  eventType: 'executionReport',
  eventTime: 1645179366291,
  symbol: 'BNBUSDT',
  newClientOrderId: 'web_809bc732660c4c9ab2c8f244d3ded348',
  side: 'SELL',
  orderType: 'MARKET',
  cancelType: 'GTC',
  quantity: 0.025,
  price: 0,
  stopPrice: 0,
  icebergQuantity: 0,
  orderListId: -1,
  originalClientOrderId: '',
  executionType: 'TRADE',
  orderStatus: 'FILLED',
  rejectReason: 'NONE',
  orderId: 3700128501,
  lastTradeQuantity: 0.025,
  accumulatedQuantity: 0.025,
  lastTradePrice: 408.1,
  commission: 0.0102025,
  commissionAsset: 'USDT',
  tradeTime: 1645179366290,
  tradeId: 518531590,
  ignoreThis1: 7900938142,
  isOrderOnBook: false,
  isMaker: false,
  ignoreThis2: true,
  orderCreationTime: 1645179366290,
  cumulativeQuoteAssetTransactedQty: 10.2025,
  lastQuoteAssetTransactedQty: 10.2025,
  orderQuoteQty: 0
}

const streamUserSpotSellMarket_accountUpdate_with_QuoteComission = {
  eventType: 'outboundAccountPosition',
  eventTime: 1645179366291,
  lastAccountUpdateTime: 1645179366290,
  balances: [
    { asset: 'BNB', free: 15.36340652, locked: 0 },
    { asset: 'USDT', free: 2057.8847975, locked: 300 }
  ]
}


// ---------------------------------------------------------------------------------------------------
//  executionReport : FUTURES buy market 10 USDT with BaseComission
// ---------------------------------------------------------------------------------------------------

const streamUserFuturesBuyMarket_New_with_BaseCommission = {
  eventType: 'ORDER_TRADE_UPDATE',
  eventTime: 1645180320051,
  transactionTime: 1645180320045,
  order: {
    symbol: 'BNBUSDT',
    clientOrderId: 'web_FmThQnDeTo955hdF6Wh0',
    orderSide: 'BUY',
    orderType: 'MARKET',
    orderTimeInForce: 'GTC',
    originalQuantity: 0.02,
    originalPrice: 0,
    averagePrice: 0,
    stopPrice: 0,
    executionType: 'NEW',
    orderStatus: 'NEW',
    orderId: 37656786950,
    lastFilledQuantity: 0,
    orderFilledAccumulatedQuantity: 0,
    lastFilledPrice: 0,
    commissionAsset: undefined,
    commissionAmount: NaN,
    orderTradeTime: 1645180320045,
    tradeId: 0,
    bidsNotional: 0,
    asksNotional: 0,
    isMakerTrade: false,
    isReduceOnly: false,
    stopPriceWorkingType: 'CONTRACT_PRICE',
    originalOrderType: 'MARKET',
    positionSide: 'BOTH',
    isCloseAll: false,
    trailingStopActivationPrice: NaN,
    trailingStopCallbackRate: NaN,
    realisedProfit: 0
  }
}

const streamUserFuturesBuyMarket_Filled_with_BaseCommission = {
  eventType: 'ORDER_TRADE_UPDATE',
  eventTime: 1645180320054,
  transactionTime: 1645180320045,
  order: {
    symbol: 'BNBUSDT',
    clientOrderId: 'web_FmThQnDeTo955hdF6Wh0',
    orderSide: 'BUY',
    orderType: 'MARKET',
    orderTimeInForce: 'GTC',
    originalQuantity: 0.02,
    originalPrice: 0,
    averagePrice: 408.26,
    stopPrice: 0,
    executionType: 'TRADE',
    orderStatus: 'FILLED',
    orderId: 37656786950,
    lastFilledQuantity: 0.02,
    orderFilledAccumulatedQuantity: 0.02,   // base quantity
    lastFilledPrice: 408.26,
    commissionAsset: 'USDT',
    commissionAmount: 0.00326608,
    orderTradeTime: 1645180320045,
    tradeId: 637858969,
    bidsNotional: 0,
    asksNotional: 0,
    isMakerTrade: false,
    isReduceOnly: false,
    stopPriceWorkingType: 'CONTRACT_PRICE',
    originalOrderType: 'MARKET',
    positionSide: 'BOTH',
    isCloseAll: false,
    trailingStopActivationPrice: NaN,
    trailingStopCallbackRate: NaN,
    realisedProfit: 0
  }
}

const streamUserFuturesBuyMarket_accountUpdate_with_BaseCommission = {
  eventType: 'ACCOUNT_UPDATE',
  eventTime: 1645180320054,
  transactionId: 1645180320045,
  updateData: {
    updateEventType: 'ORDER',
    updatedBalances: [ [Object] ],
    updatedPositions: [ [Object] ]
  }
}


// ---------------------------------------------------------------------------------------------------
//  executionReport : FUTURES sell market 0.02 BNB with BaseComission
// ---------------------------------------------------------------------------------------------------

const streamUserFuturesSellMarket_New_with_BaseComission = {
  eventType: 'ORDER_TRADE_UPDATE',
  eventTime: 1645180332394,
  transactionTime: 1645180332389,
  order: {
    symbol: 'BNBUSDT',
    clientOrderId: 'web_ocr4uH7XGoji8AtsO3AS',
    orderSide: 'SELL',
    orderType: 'MARKET',
    orderTimeInForce: 'GTC',
    originalQuantity: 0.02,
    originalPrice: 0,
    averagePrice: 0,
    stopPrice: 0,
    executionType: 'NEW',
    orderStatus: 'NEW',
    orderId: 37656788710,
    lastFilledQuantity: 0,
    orderFilledAccumulatedQuantity: 0,
    lastFilledPrice: 0,
    commissionAsset: undefined,
    commissionAmount: NaN,
    orderTradeTime: 1645180332389,
    tradeId: 0,
    bidsNotional: 0,
    asksNotional: 0,
    isMakerTrade: false,
    isReduceOnly: true,
    stopPriceWorkingType: 'CONTRACT_PRICE',
    originalOrderType: 'MARKET',
    positionSide: 'BOTH',
    isCloseAll: false,
    trailingStopActivationPrice: NaN,
    trailingStopCallbackRate: NaN,
    realisedProfit: 0
  }
}

const streamUserFuturesSellMarket_Filled_with_BaseComission = {
  eventType: 'ORDER_TRADE_UPDATE',
  eventTime: 1645180332394,
  transactionTime: 1645180332389,
  order: {
    symbol: 'BNBUSDT',
    clientOrderId: 'web_ocr4uH7XGoji8AtsO3AS',
    orderSide: 'SELL',
    orderType: 'MARKET',
    orderTimeInForce: 'GTC',
    originalQuantity: 0.02,
    originalPrice: 0,
    averagePrice: 408.31,
    stopPrice: 0,
    executionType: 'TRADE',
    orderStatus: 'FILLED',
    orderId: 37656788710,
    lastFilledQuantity: 0.02,
    orderFilledAccumulatedQuantity: 0.02,  // base quantity
    lastFilledPrice: 408.31,
    commissionAsset: 'USDT',
    commissionAmount: 0.00326648,
    orderTradeTime: 1645180332389,
    tradeId: 637859072,
    bidsNotional: 0,
    asksNotional: 0,
    isMakerTrade: false,
    isReduceOnly: true,
    stopPriceWorkingType: 'CONTRACT_PRICE',
    originalOrderType: 'MARKET',
    positionSide: 'BOTH',
    isCloseAll: false,
    trailingStopActivationPrice: NaN,
    trailingStopCallbackRate: NaN,
    realisedProfit: 0.001
  }
}

const streamUserFuturesSellMarket_accountUpdate_with_BaseComission = {
  eventType: 'ACCOUNT_UPDATE',
  eventTime: 1645180332394,
  transactionId: 1645180332389,
  updateData: {
    updateEventType: 'ORDER',
    updatedBalances: [ [Object] ],
    updatedPositions: [ [Object] ]
  }
}


const streamUserFuturesAccountConfigUpdate = {
  stream: 'PexyKLAIHOFI0EKfEQFvdv3pUjPQ3a6mLuDPQrT8MLnQv2j0TBP6CzWJfOG4k9t5',
  data: {
    e: 'ACCOUNT_CONFIG_UPDATE',
    T: 1646145679696,
    E: 1646145679706,
    ac: { s: 'BNBUSDT', l: 2 }
  }
}
