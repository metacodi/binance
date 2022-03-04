const exemple_6_balanceUpdate_Inicial = {
 "eventType": "ACCOUNT_UPDATE",
 "eventTime": 1646384137973,
 "transactionId": 1646384137968,
 "updateData": {
  "updateEventType": "DEPOSIT",
  "updatedBalances": [
   {
    "asset": "USDT",
    "balanceChange": 28,
    "crossWalletBalance": 28,
    "walletBalance": 28
   }
  ],
  "updatedPositions": []
 }
};

const exemple_6_orderUpdate_BuyLimit_New_1 = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646384340270,
 "transactionTime": 1646384340263,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_Ej9La3CKm5dtqd5z8fDC",
  "orderSide": "BUY",
  "orderType": "LIMIT",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.02,
  "originalPrice": 396,
  "averagePrice": 0,
  "stopPrice": 0,
  "executionType": "NEW",
  "orderStatus": "NEW",
  "orderId": 37877239826,
  "lastFilledQuantity": 0,
  "orderFilledAccumulatedQuantity": 0,
  "lastFilledPrice": 0,
  "commissionAmount": null,
  "orderTradeTime": 1646384340263,
  "tradeId": 0,
  "bidsNotional": 0,
  "asksNotional": 0,
  "isMakerTrade": false,
  "isReduceOnly": false,
  "stopPriceWorkingType": "CONTRACT_PRICE",
  "originalOrderType": "LIMIT",
  "positionSide": "BOTH",
  "isCloseAll": false,
  "trailingStopActivationPrice": null,
  "trailingStopCallbackRate": null,
  "realisedProfit": 0
 }
};

const exemple_6_balanceUpdate_BuyLimit_1 = {
 "eventType": "ACCOUNT_UPDATE",
 "eventTime": 1646384340270,
 "transactionId": 1646384340263,
 "updateData": {
  "updateEventType": "ORDER",
  "updatedBalances": [
   {
    "asset": "USDT",
    "balanceChange": 0,
    "crossWalletBalance": 27.9968368,
    "walletBalance": 27.9968368
   }
  ],
  "updatedPositions": [
   {
    "symbol": "BNBUSDT",
    "positionAmount": 0.02,
    "entryPrice": 395.4,
    "accumulatedRealisedPreFee": 0.5812,
    "unrealisedPnl": 0.00043481,
    "marginType": "cross",
    "isolatedWalletAmount": 0,
    "positionSide": "BOTH"
   }
  ]
 }
};

const exemple_6_orderUpdate_BuyLimit_Filled_1 = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646384340270,
 "transactionTime": 1646384340263,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_Ej9La3CKm5dtqd5z8fDC",
  "orderSide": "BUY",
  "orderType": "LIMIT",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.02,
  "originalPrice": 396,
  "averagePrice": 395.4,
  "stopPrice": 0,
  "executionType": "TRADE",
  "orderStatus": "FILLED",
  "orderId": 37877239826,
  "lastFilledQuantity": 0.02,
  "orderFilledAccumulatedQuantity": 0.02,
  "lastFilledPrice": 395.4,
  "commissionAsset": "USDT",
  "commissionAmount": 0.0031632,
  "orderTradeTime": 1646384340263,
  "tradeId": 649717693,
  "bidsNotional": 0,
  "asksNotional": 0,
  "isMakerTrade": false,
  "isReduceOnly": false,
  "stopPriceWorkingType": "CONTRACT_PRICE",
  "originalOrderType": "LIMIT",
  "positionSide": "BOTH",
  "isCloseAll": false,
  "trailingStopActivationPrice": null,
  "trailingStopCallbackRate": null,
  "realisedProfit": 0
 }
};

const exemple_6_orderUpdate_BuyLimit_New_2 = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646384487545,
 "transactionTime": 1646384487537,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_OkUpS42NwvF2MFDb4ZXm",
  "orderSide": "BUY",
  "orderType": "LIMIT",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.02,
  "originalPrice": 396,
  "averagePrice": 0,
  "stopPrice": 0,
  "executionType": "NEW",
  "orderStatus": "NEW",
  "orderId": 37877270871,
  "lastFilledQuantity": 0,
  "orderFilledAccumulatedQuantity": 0,
  "lastFilledPrice": 0,
  "commissionAmount": null,
  "orderTradeTime": 1646384487537,
  "tradeId": 0,
  "bidsNotional": 7.92,
  "asksNotional": 0,
  "isMakerTrade": false,
  "isReduceOnly": false,
  "stopPriceWorkingType": "CONTRACT_PRICE",
  "originalOrderType": "LIMIT",
  "positionSide": "BOTH",
  "isCloseAll": false,
  "trailingStopActivationPrice": null,
  "trailingStopCallbackRate": null,
  "realisedProfit": 0
 }
};

const exemple_6_balanceUpdate_BuyLimit_2 = {
 "eventType": "ACCOUNT_UPDATE",
 "eventTime": 1646384503856,
 "transactionId": 1646384503849,
 "updateData": {
  "updateEventType": "ORDER",
  "updatedBalances": [
   {
    "asset": "USDT",
    "balanceChange": 0,
    "crossWalletBalance": 27.9952528,
    "walletBalance": 27.9952528
   }
  ],
  "updatedPositions": [
   {
    "symbol": "BNBUSDT",
    "positionAmount": 0.04,
    "entryPrice": 395.7,
    "accumulatedRealisedPreFee": 0.5812,
    "unrealisedPnl": 0.0176,
    "marginType": "cross",
    "isolatedWalletAmount": 0,
    "positionSide": "BOTH"
   }
  ]
 }
};

const exemple_6_orderUpdate_BuyLimit_Filled_2 = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646384503856,
 "transactionTime": 1646384503849,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_OkUpS42NwvF2MFDb4ZXm",
  "orderSide": "BUY",
  "orderType": "LIMIT",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.02,
  "originalPrice": 396,
  "averagePrice": 396,
  "stopPrice": 0,
  "executionType": "TRADE",
  "orderStatus": "FILLED",
  "orderId": 37877270871,
  "lastFilledQuantity": 0.02,
  "orderFilledAccumulatedQuantity": 0.02,
  "lastFilledPrice": 396,
  "commissionAsset": "USDT",
  "commissionAmount": 0.001584,
  "orderTradeTime": 1646384503849,
  "tradeId": 649719366,
  "bidsNotional": 0,
  "asksNotional": 0,
  "isMakerTrade": true,
  "isReduceOnly": false,
  "stopPriceWorkingType": "CONTRACT_PRICE",
  "originalOrderType": "LIMIT",
  "positionSide": "BOTH",
  "isCloseAll": false,
  "trailingStopActivationPrice": null,
  "trailingStopCallbackRate": null,
  "realisedProfit": 0
 }
};

const exemple_6_orderUpdate_SellLimit_New = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646384638660,
 "transactionTime": 1646384638642,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_wBuwGkSMjRoD5tFOkiP9",
  "orderSide": "SELL",
  "orderType": "LIMIT",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.03,
  "originalPrice": 396.5,
  "averagePrice": 0,
  "stopPrice": 0,
  "executionType": "NEW",
  "orderStatus": "NEW",
  "orderId": 37877307672,
  "lastFilledQuantity": 0,
  "orderFilledAccumulatedQuantity": 0,
  "lastFilledPrice": 0,
  "commissionAmount": null,
  "orderTradeTime": 1646384638642,
  "tradeId": 0,
  "bidsNotional": 0,
  "asksNotional": 11.895,
  "isMakerTrade": false,
  "isReduceOnly": false,
  "stopPriceWorkingType": "CONTRACT_PRICE",
  "originalOrderType": "LIMIT",
  "positionSide": "BOTH",
  "isCloseAll": false,
  "trailingStopActivationPrice": null,
  "trailingStopCallbackRate": null,
  "realisedProfit": 0
 }
};

const exemple_6_balanceUpdate_SellLimit = {
 "eventType": "ACCOUNT_UPDATE",
 "eventTime": 1646384735706,
 "transactionId": 1646384735701,
 "updateData": {
  "updateEventType": "ORDER",
  "updatedBalances": [
   {
    "asset": "USDT",
    "balanceChange": 0,
    "crossWalletBalance": 28.0168738,
    "walletBalance": 28.0168738
   }
  ],
  "updatedPositions": [
   {
    "symbol": "BNBUSDT",
    "positionAmount": 0.01,
    "entryPrice": 395.7,
    "accumulatedRealisedPreFee": 0.6052,
    "unrealisedPnl": 0.0071,
    "marginType": "cross",
    "isolatedWalletAmount": 0,
    "positionSide": "BOTH"
   }
  ]
 }
};

const exemple_6_orderUpdate_SellLimit_Filled = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646384735706,
 "transactionTime": 1646384735701,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_wBuwGkSMjRoD5tFOkiP9",
  "orderSide": "SELL",
  "orderType": "LIMIT",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.03,
  "originalPrice": 396.5,
  "averagePrice": 396.5,
  "stopPrice": 0,
  "executionType": "TRADE",
  "orderStatus": "FILLED",
  "orderId": 37877307672,
  "lastFilledQuantity": 0.03,
  "orderFilledAccumulatedQuantity": 0.03,
  "lastFilledPrice": 396.5,
  "commissionAsset": "USDT",
  "commissionAmount": 0.002379,
  "orderTradeTime": 1646384735701,
  "tradeId": 649721736,
  "bidsNotional": 0,
  "asksNotional": 0,
  "isMakerTrade": true,
  "isReduceOnly": false,
  "stopPriceWorkingType": "CONTRACT_PRICE",
  "originalOrderType": "LIMIT",
  "positionSide": "BOTH",
  "isCloseAll": false,
  "trailingStopActivationPrice": null,
  "trailingStopCallbackRate": null,
  "realisedProfit": 0.024
 }
};

const exemple_6_orderUpdate_ = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646385216358,
 "transactionTime": 1646385216352,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_9UbruVReJXAgaQFsrsqC",
  "orderSide": "SELL",
  "orderType": "LIMIT",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.15,
  "originalPrice": 396.8,
  "averagePrice": 0,
  "stopPrice": 0,
  "executionType": "NEW",
  "orderStatus": "NEW",
  "orderId": 37877420721,
  "lastFilledQuantity": 0,
  "orderFilledAccumulatedQuantity": 0,
  "lastFilledPrice": 0,
  "commissionAmount": null,
  "orderTradeTime": 1646385216352,
  "tradeId": 0,
  "bidsNotional": 0,
  "asksNotional": 59.52,
  "isMakerTrade": false,
  "isReduceOnly": false,
  "stopPriceWorkingType": "CONTRACT_PRICE",
  "originalOrderType": "LIMIT",
  "positionSide": "BOTH",
  "isCloseAll": false,
  "trailingStopActivationPrice": null,
  "trailingStopCallbackRate": null,
  "realisedProfit": 0
 }
};

const exemple_6_orderUpdate_ = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646385512006,
 "transactionTime": 1646385511999,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_RLlsI8MD6APf691BUbyr",
  "orderSide": "BUY",
  "orderType": "MARKET",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.13,
  "originalPrice": 0,
  "averagePrice": 0,
  "stopPrice": 0,
  "executionType": "NEW",
  "orderStatus": "NEW",
  "orderId": 37877489746,
  "lastFilledQuantity": 0,
  "orderFilledAccumulatedQuantity": 0,
  "lastFilledPrice": 0,
  "commissionAmount": null,
  "orderTradeTime": 1646385511999,
  "tradeId": 0,
  "bidsNotional": 0,
  "asksNotional": 59.52,
  "isMakerTrade": false,
  "isReduceOnly": false,
  "stopPriceWorkingType": "CONTRACT_PRICE",
  "originalOrderType": "MARKET",
  "positionSide": "BOTH",
  "isCloseAll": false,
  "trailingStopActivationPrice": null,
  "trailingStopCallbackRate": null,
  "realisedProfit": 0
 }
};

const exemple_6_balanceUpdate_ = {
 "eventType": "ACCOUNT_UPDATE",
 "eventTime": 1646385512006,
 "transactionId": 1646385511999,
 "updateData": {
  "updateEventType": "ORDER",
  "updatedBalances": [
   {
    "asset": "USDT",
    "balanceChange": 0,
    "crossWalletBalance": 27.99633953,
    "walletBalance": 27.99633953
   }
  ],
  "updatedPositions": [
   {
    "symbol": "BNBUSDT",
    "positionAmount": 0.14,
    "entryPrice": 394.94786,
    "accumulatedRealisedPreFee": 0.6052,
    "unrealisedPnl": -0.003899,
    "marginType": "cross",
    "isolatedWalletAmount": 0,
    "positionSide": "BOTH"
   }
  ]
 }
};

const exemple_6_orderUpdate_ = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646385512006,
 "transactionTime": 1646385511999,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_RLlsI8MD6APf691BUbyr",
  "orderSide": "BUY",
  "orderType": "MARKET",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.13,
  "originalPrice": 0,
  "averagePrice": 394.89,
  "stopPrice": 0,
  "executionType": "TRADE",
  "orderStatus": "FILLED",
  "orderId": 37877489746,
  "lastFilledQuantity": 0.13,
  "orderFilledAccumulatedQuantity": 0.13,
  "lastFilledPrice": 394.89,
  "commissionAsset": "USDT",
  "commissionAmount": 0.02053427,
  "orderTradeTime": 1646385511999,
  "tradeId": 649730862,
  "bidsNotional": 0,
  "asksNotional": 59.52,
  "isMakerTrade": false,
  "isReduceOnly": false,
  "stopPriceWorkingType": "CONTRACT_PRICE",
  "originalOrderType": "MARKET",
  "positionSide": "BOTH",
  "isCloseAll": false,
  "trailingStopActivationPrice": null,
  "trailingStopCallbackRate": null,
  "realisedProfit": 0
 }
};

const exemple_6_orderUpdate_ = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646385537284,
 "transactionTime": 1646385537278,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_FUhUkLbJS1PoYwvi8hNH",
  "orderSide": "SELL",
  "orderType": "LIMIT",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.12,
  "originalPrice": 396.8,
  "averagePrice": 0,
  "stopPrice": 0,
  "executionType": "NEW",
  "orderStatus": "NEW",
  "orderId": 37877495891,
  "lastFilledQuantity": 0,
  "orderFilledAccumulatedQuantity": 0,
  "lastFilledPrice": 0,
  "commissionAmount": null,
  "orderTradeTime": 1646385537278,
  "tradeId": 0,
  "bidsNotional": 0,
  "asksNotional": 107.136,
  "isMakerTrade": false,
  "isReduceOnly": false,
  "stopPriceWorkingType": "CONTRACT_PRICE",
  "originalOrderType": "LIMIT",
  "positionSide": "BOTH",
  "isCloseAll": false,
  "trailingStopActivationPrice": null,
  "trailingStopCallbackRate": null,
  "realisedProfit": 0
 }
};

const exemple_6_balanceUpdate_ = {
 "eventType": "ACCOUNT_UPDATE",
 "eventTime": 1646385874517,
 "transactionId": 1646385874489,
 "updateData": {
  "updateEventType": "ORDER",
  "updatedBalances": [
   {
    "asset": "USDT",
    "balanceChange": 0,
    "crossWalletBalance": 28.24373552,
    "walletBalance": 28.24373552
   }
  ],
  "updatedPositions": [
   {
    "symbol": "BNBUSDT",
    "positionAmount": -0.01,
    "entryPrice": 396.8,
    "accumulatedRealisedPreFee": 0.86449999,
    "unrealisedPnl": 0.00076352,
    "marginType": "cross",
    "isolatedWalletAmount": 0,
    "positionSide": "BOTH"
   }
  ]
 }
};

const exemple_6_orderUpdate_ = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646385874517,
 "transactionTime": 1646385874489,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_9UbruVReJXAgaQFsrsqC",
  "orderSide": "SELL",
  "orderType": "LIMIT",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.15,
  "originalPrice": 396.8,
  "averagePrice": 396.8,
  "stopPrice": 0,
  "executionType": "TRADE",
  "orderStatus": "FILLED",
  "orderId": 37877420721,
  "lastFilledQuantity": 0.15,
  "orderFilledAccumulatedQuantity": 0.15,
  "lastFilledPrice": 396.8,
  "commissionAsset": "USDT",
  "commissionAmount": 0.011904,
  "orderTradeTime": 1646385874489,
  "tradeId": 649733423,
  "bidsNotional": 0,
  "asksNotional": 0,
  "isMakerTrade": true,
  "isReduceOnly": false,
  "stopPriceWorkingType": "CONTRACT_PRICE",
  "originalOrderType": "LIMIT",
  "positionSide": "BOTH",
  "isCloseAll": false,
  "trailingStopActivationPrice": null,
  "trailingStopCallbackRate": null,
  "realisedProfit": 0.25929999
 }
};

const exemple_6_balanceUpdate_ = {
 "eventType": "ACCOUNT_UPDATE",
 "eventTime": 1646385874517,
 "transactionId": 1646385874489,
 "updateData": {
  "updateEventType": "ORDER",
  "updatedBalances": [
   {
    "asset": "USDT",
    "balanceChange": 0,
    "crossWalletBalance": 28.23421232,
    "walletBalance": 28.23421232
   }
  ],
  "updatedPositions": [
   {
    "symbol": "BNBUSDT",
    "positionAmount": -0.13,
    "entryPrice": 396.8,
    "accumulatedRealisedPreFee": 0.86449999,
    "unrealisedPnl": 0.00992576,
    "marginType": "cross",
    "isolatedWalletAmount": 0,
    "positionSide": "BOTH"
   }
  ]
 }
};

const exemple_6_orderUpdate_ = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646385874517,
 "transactionTime": 1646385874489,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_FUhUkLbJS1PoYwvi8hNH",
  "orderSide": "SELL",
  "orderType": "LIMIT",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.12,
  "originalPrice": 396.8,
  "averagePrice": 396.8,
  "stopPrice": 0,
  "executionType": "TRADE",
  "orderStatus": "FILLED",
  "orderId": 37877495891,
  "lastFilledQuantity": 0.12,
  "orderFilledAccumulatedQuantity": 0.12,
  "lastFilledPrice": 396.8,
  "commissionAsset": "USDT",
  "commissionAmount": 0.0095232,
  "orderTradeTime": 1646385874489,
  "tradeId": 649733425,
  "bidsNotional": 0,
  "asksNotional": 0,
  "isMakerTrade": true,
  "isReduceOnly": false,
  "stopPriceWorkingType": "CONTRACT_PRICE",
  "originalOrderType": "LIMIT",
  "positionSide": "BOTH",
  "isCloseAll": false,
  "trailingStopActivationPrice": null,
  "trailingStopCallbackRate": null,
  "realisedProfit": 0
 }
};

