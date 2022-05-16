
const exemple_5_balanceUpdate_Inicial = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646151096308,
  "transactionId": 1646151096301,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [
      {
        "asset": "USDT",
        "balanceChange": 0,
        "crossWalletBalance": 10.0,
        "walletBalance": 10.0
      }
    ],
    "updatedPositions": []
  }
};


const exemple_5_orderUpdate_BuyLimit_New = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646153092042,
  "transactionTime": 1646153092038,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_2yGo8VX2M8ZVuh24sP4B",
    "orderSide": "BUY",
    "orderType": "LIMIT",
    "orderTimeInForce": "GTC",
    "originalQuantity": 0.04,
    "originalPrice": 404,
    "averagePrice": 0,
    "stopPrice": 0,
    "executionType": "NEW",
    "orderStatus": "NEW",
    "orderId": 37836421348,
    "lastFilledQuantity": 0,
    "orderFilledAccumulatedQuantity": 0,
    "lastFilledPrice": 0,
    "commissionAmount": null,
    "orderTradeTime": 1646153092038,
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

const exemple_5_balanceUpdate_BuyLimit_Filled = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646153092042,
  "transactionId": 1646153092038,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [
      {
        "asset": "USDT",
        "balanceChange": 0,
        "crossWalletBalance": 1.9202,
        "walletBalance": 9.99353616
      }
    ],
    "updatedPositions": [
      {
        "symbol": "BNBUSDT",
        "positionAmount": 0.04,
        "entryPrice": 403.99,
        "accumulatedRealisedPreFee": 1.5651,
        "unrealisedPnl": 0.00041172,
        "marginType": "isolated",
        "isolatedWalletAmount": 8.07333616,
        "positionSide": "BOTH"
      }
    ]
  }
};

const exemple_5_orderUpdate_BuyLimit_Filled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646153092042,
  "transactionTime": 1646153092038,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_2yGo8VX2M8ZVuh24sP4B",
    "orderSide": "BUY",
    "orderType": "LIMIT",
    "orderTimeInForce": "GTC",
    "originalQuantity": 0.04,
    "originalPrice": 404,
    "averagePrice": 403.99,
    "stopPrice": 0,
    "executionType": "TRADE",
    "orderStatus": "FILLED",
    "orderId": 37836421348,
    "lastFilledQuantity": 0.04,
    "orderFilledAccumulatedQuantity": 0.04,
    "lastFilledPrice": 403.99,
    "commissionAsset": "USDT",
    "commissionAmount": 0.00646384,
    "orderTradeTime": 1646153092038,
    "tradeId": 647647281,
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

const exemple_5_orderUpdate_SellLimit_New = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646153646336,
  "transactionTime": 1646153646332,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_qHB3XE5IgFHoHyxNmVyy",
    "orderSide": "SELL",
    "orderType": "LIMIT",
    "orderTimeInForce": "GTC",
    "originalQuantity": 0.08,
    "originalPrice": 404,
    "averagePrice": 0,
    "stopPrice": 0,
    "executionType": "NEW",
    "orderStatus": "NEW",
    "orderId": 37836575195,
    "lastFilledQuantity": 0,
    "orderFilledAccumulatedQuantity": 0,
    "lastFilledPrice": 0,
    "commissionAmount": null,
    "orderTradeTime": 1646153646332,
    "tradeId": 0,
    "bidsNotional": 0,
    "asksNotional": 32.32,
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

const exemple_5_balanceUpdate_SellLimit_Filled = {
 "eventType": "ACCOUNT_UPDATE",
 "eventTime": 1646157001114,
 "transactionId": 1646157001105,
 "updateData": {
  "updateEventType": "ORDER",
  "updatedBalances": [
   {
    "asset": "USDT",
    "balanceChange": 0,
    "crossWalletBalance": 1.91070416,
    "walletBalance": 9.98747216
   }
  ],
  "updatedPositions": [
   {
    "symbol": "BNBUSDT",
    "positionAmount": -0.04,
    "entryPrice": 404,
    "accumulatedRealisedPreFee": 1.5655,
    "unrealisedPnl": 0.0016,
    "marginType": "isolated",
    "isolatedWalletAmount": 8.076768,
    "positionSide": "BOTH"
   }
  ]
 }
};

const exemple_5_orderUpdate_SellLimit_Filled = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646157001114,
 "transactionTime": 1646157001105,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_qHB3XE5IgFHoHyxNmVyy",
  "orderSide": "SELL",
  "orderType": "LIMIT",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.08,
  "originalPrice": 404,
  "averagePrice": 404,
  "stopPrice": 0,
  "executionType": "TRADE",
  "orderStatus": "FILLED",
  "orderId": 37836575195,
  "lastFilledQuantity": 0.08,
  "orderFilledAccumulatedQuantity": 0.08,
  "lastFilledPrice": 404,
  "commissionAsset": "USDT",
  "commissionAmount": 0.006464,
  "orderTradeTime": 1646157001105,
  "tradeId": 647691680,
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
  "realisedProfit": 0.0004
 }
};

