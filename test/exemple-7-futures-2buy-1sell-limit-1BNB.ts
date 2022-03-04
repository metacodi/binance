const exemple_7_orderUpdate_BUY_MARKET_1 = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646386272385,
 "transactionTime": 1646386272380,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_kh0X9xZUL6Y0A9MNAlGz",
  "orderSide": "BUY",
  "orderType": "MARKET",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.13,
  "originalPrice": 0,
  "averagePrice": 0,
  "stopPrice": 0,
  "executionType": "NEW",
  "orderStatus": "NEW",
  "orderId": 37877624248,
  "lastFilledQuantity": 0,
  "orderFilledAccumulatedQuantity": 0,
  "lastFilledPrice": 0,
  "commissionAmount": null,
  "orderTradeTime": 1646386272380,
  "tradeId": 0,
  "bidsNotional": 0,
  "asksNotional": 0,
  "isMakerTrade": false,
  "isReduceOnly": true,
  "stopPriceWorkingType": "CONTRACT_PRICE",
  "originalOrderType": "MARKET",
  "positionSide": "BOTH",
  "isCloseAll": false,
  "trailingStopActivationPrice": null,
  "trailingStopCallbackRate": null,
  "realisedProfit": 0
 }
};

const exemple_7_balanceUpdate_1 = {
 "eventType": "ACCOUNT_UPDATE",
 "eventTime": 1646386272385,
 "transactionId": 1646386272380,
 "updateData": {
  "updateEventType": "ORDER",
  "updatedBalances": [
   {
    "asset": "USDT",
    "balanceChange": 0,
    "crossWalletBalance": 28.25909692,
    "walletBalance": 28.25909692
   }
  ],
  "updatedPositions": [
   {
    "symbol": "BNBUSDT",
    "positionAmount": 0,
    "entryPrice": 0,
    "accumulatedRealisedPreFee": 0.90999999,
    "unrealisedPnl": 0,
    "marginType": "cross",
    "isolatedWalletAmount": 0,
    "positionSide": "BOTH"
   }
  ]
 }
};

const exemple_7_orderUpdate__BUY_MARKET_FILLED_2 = {
 "eventType": "ORDER_TRADE_UPDATE",
 "eventTime": 1646386272385,
 "transactionTime": 1646386272380,
 "order": {
  "symbol": "BNBUSDT",
  "clientOrderId": "web_kh0X9xZUL6Y0A9MNAlGz",
  "orderSide": "BUY",
  "orderType": "MARKET",
  "orderTimeInForce": "GTC",
  "originalQuantity": 0.13,
  "originalPrice": 0,
  "averagePrice": 396.45,
  "stopPrice": 0,
  "executionType": "TRADE",
  "orderStatus": "FILLED",
  "orderId": 37877624248,
  "lastFilledQuantity": 0.13,
  "orderFilledAccumulatedQuantity": 0.13,
  "lastFilledPrice": 396.45,
  "commissionAsset": "USDT",
  "commissionAmount": 0.0206154,
  "orderTradeTime": 1646386272380,
  "tradeId": 649737101,
  "bidsNotional": 0,
  "asksNotional": 0,
  "isMakerTrade": false,
  "isReduceOnly": true,
  "stopPriceWorkingType": "CONTRACT_PRICE",
  "originalOrderType": "MARKET",
  "positionSide": "BOTH",
  "isCloseAll": false,
  "trailingStopActivationPrice": null,
  "trailingStopCallbackRate": null,
  "realisedProfit": 0.0455
 }
};

const exemple_7_balanceUpdate_2 = {
 "eventType": "ACCOUNT_UPDATE",
 "eventTime": 1646386350088,
 "transactionId": 1646386350082,
 "updateData": {
  "updateEventType": "WITHDRAW",
  "updatedBalances": [
   {
    "asset": "USDT",
    "balanceChange": -0.25909692,
    "crossWalletBalance": 28,
    "walletBalance": 28
   }
  ],
  "updatedPositions": []
 }
};
