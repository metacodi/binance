const exemple_4_balanceUpdate_Inicial = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646150822780,
  "transactionId": 1646150822774,
  "updateData": {
    "updateEventType": "DEPOSIT",
    "updatedBalances": [
      {
        "asset": "USDT",
        "balanceChange": 872.50624823,
        "crossWalletBalance": 872.50624823,
        "walletBalance": 872.50624823
      }
    ],
    "updatedPositions": []
  }
};

const exemple_4_orderUpdate_BuyLimit_New = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646150849797,
  "transactionTime": 1646150849789,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_SUw9fshDZ63ZBMt5PLmE",
    "orderSide": "BUY",
    "orderType": "LIMIT",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 404,
    "averagePrice": 0,
    "stopPrice": 0,
    "executionType": "NEW",
    "orderStatus": "NEW",
    "orderId": 37835851483,
    "lastFilledQuantity": 0,
    "orderFilledAccumulatedQuantity": 0,
    "lastFilledPrice": 0,
    "commissionAmount": null,
    "orderTradeTime": 1646150849789,
    "tradeId": 0,
    "bidsNotional": 404,
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

const exemple_4_balanceUpdate_BuyLimit_PartialFilled = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646150860721,
  "transactionId": 1646150860713,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [
      {
        "asset": "USDT",
        "balanceChange": 0,
        "crossWalletBalance": 872.45292023,
        "walletBalance": 872.45292023
      }
    ],
    "updatedPositions": [
      {
        "symbol": "BNBUSDT",
        "positionAmount": 0.66,
        "entryPrice": 404,
        "accumulatedRealisedPreFee": 1.0151,
        "unrealisedPnl": 0.16162205,
        "marginType": "cross",
        "isolatedWalletAmount": 0,
        "positionSide": "BOTH"
      }
    ]
  }
};

const exemple_4_orderUpdate_BuyLimit__PartialFilled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646150860721,
  "transactionTime": 1646150860713,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_SUw9fshDZ63ZBMt5PLmE",
    "orderSide": "BUY",
    "orderType": "LIMIT",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 404,
    "averagePrice": 404,
    "stopPrice": 0,
    "executionType": "TRADE",
    "orderStatus": "PARTIALLY_FILLED",
    "orderId": 37835851483,
    "lastFilledQuantity": 0.66,
    "orderFilledAccumulatedQuantity": 0.66,
    "lastFilledPrice": 404,
    "commissionAsset": "USDT",
    "commissionAmount": 0.053328,
    "orderTradeTime": 1646150860713,
    "tradeId": 647617537,
    "bidsNotional": 137.36,
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

const exemple_4_balanceUpdate_BuyLimit_Filled = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646150860733,
  "transactionId": 1646150860725,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [
      {
        "asset": "USDT",
        "balanceChange": 0,
        "crossWalletBalance": 872.42544823,
        "walletBalance": 872.42544823
      }
    ],
    "updatedPositions": [
      {
        "symbol": "BNBUSDT",
        "positionAmount": 1,
        "entryPrice": 404,
        "accumulatedRealisedPreFee": 1.0151,
        "unrealisedPnl": 0.2448819,
        "marginType": "cross",
        "isolatedWalletAmount": 0,
        "positionSide": "BOTH"
      }
    ]
  }
};

const exemple_4_orderUpdate_BuyLimit_Filled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646150860733,
  "transactionTime": 1646150860725,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_SUw9fshDZ63ZBMt5PLmE",
    "orderSide": "BUY",
    "orderType": "LIMIT",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 404,
    "averagePrice": 404,
    "stopPrice": 0,
    "executionType": "TRADE",
    "orderStatus": "FILLED",
    "orderId": 37835851483,
    "lastFilledQuantity": 0.34,
    "orderFilledAccumulatedQuantity": 1,
    "lastFilledPrice": 404,
    "commissionAsset": "USDT",
    "commissionAmount": 0.027472,
    "orderTradeTime": 1646150860725,
    "tradeId": 647617538,
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

const exemple_4_orderUpdate_SellLimit_New_Canceled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646150885138,
  "transactionTime": 1646150885133,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_2wtgho9hBwRKNRoCvxQb",
    "orderSide": "SELL",
    "orderType": "LIMIT",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 405,
    "averagePrice": 0,
    "stopPrice": 0,
    "executionType": "NEW",
    "orderStatus": "NEW",
    "orderId": 37835861099,
    "lastFilledQuantity": 0,
    "orderFilledAccumulatedQuantity": 0,
    "lastFilledPrice": 0,
    "commissionAmount": null,
    "orderTradeTime": 1646150885133,
    "tradeId": 0,
    "bidsNotional": 0,
    "asksNotional": 405,
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

const exemple_4_orderUpdate_SellLimit_Canceled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646151095086,
  "transactionTime": 1646151095067,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_2wtgho9hBwRKNRoCvxQb",
    "orderSide": "SELL",
    "orderType": "LIMIT",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 405,
    "averagePrice": 0,
    "stopPrice": 0,
    "executionType": "CANCELED",
    "orderStatus": "CANCELED",
    "orderId": 37835861099,
    "lastFilledQuantity": 0,
    "orderFilledAccumulatedQuantity": 0,
    "lastFilledPrice": 0,
    "commissionAmount": null,
    "orderTradeTime": 1646151095067,
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

const exemple_4_orderUpdate_SellLimit_New = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646151096308,
  "transactionTime": 1646151096301,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_BARYZJC92RGRKHO9cnmN",
    "orderSide": "SELL",
    "orderType": "LIMIT",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 404.5,
    "averagePrice": 0,
    "stopPrice": 0,
    "executionType": "NEW",
    "orderStatus": "NEW",
    "orderId": 37835912139,
    "lastFilledQuantity": 0,
    "orderFilledAccumulatedQuantity": 0,
    "lastFilledPrice": 0,
    "commissionAmount": null,
    "orderTradeTime": 1646151096301,
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

const exemple_4_balanceUpdate_SellLimit_Filled = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646151096308,
  "transactionId": 1646151096301,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [
      {
        "asset": "USDT",
        "balanceChange": 0,
        "crossWalletBalance": 872.81362823,
        "walletBalance": 872.81362823
      }
    ],
    "updatedPositions": [
      {
        "symbol": "BNBUSDT",
        "positionAmount": 0,
        "entryPrice": 0,
        "accumulatedRealisedPreFee": 1.5651,
        "unrealisedPnl": 0,
        "marginType": "cross",
        "isolatedWalletAmount": 0,
        "positionSide": "BOTH"
      }
    ]
  }
};

const exemple_4_orderUpdate_SellLimit_Filled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646151096308,
  "transactionTime": 1646151096301,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_BARYZJC92RGRKHO9cnmN",
    "orderSide": "SELL",
    "orderType": "LIMIT",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 404.5,
    "averagePrice": 404.55,
    "stopPrice": 0,
    "executionType": "TRADE",
    "orderStatus": "FILLED",
    "orderId": 37835912139,
    "lastFilledQuantity": 1,
    "orderFilledAccumulatedQuantity": 1,
    "lastFilledPrice": 404.55,
    "commissionAsset": "USDT",
    "commissionAmount": 0.16182,
    "orderTradeTime": 1646151096301,
    "tradeId": 647620350,
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
    "realisedProfit": 0.55
  }
};

