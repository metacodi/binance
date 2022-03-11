

// ---------------------------------------------------------------------------------------------------
//  FUTURES compra 1 BNB a mercat
// ---------------------------------------------------------------------------------------------------

const exemple_1_orderUpdate_BuyMarket_New = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646146064282,
  "transactionTime": 1646146064277,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_F5CNSgkUd5Rxp4UN4eWw",
    "orderSide": "BUY",
    "orderType": "MARKET",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 0,
    "averagePrice": 0,
    "stopPrice": 0,
    "executionType": "NEW",
    "orderStatus": "NEW",
    "orderId": 37834399493,
    "lastFilledQuantity": 0,
    "orderFilledAccumulatedQuantity": 0,
    "lastFilledPrice": 0,
    "commissionAmount": null,
    "orderTradeTime": 1646146064277,
    "tradeId": 0,
    "bidsNotional": 0,
    "asksNotional": 0,
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

const exemple_1_balanceUpdate_BuyMarket_PartialFilled = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646146064282,
  "transactionId": 1646146064277,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [{
      "asset": "USDT",
      "balanceChange": 0,
      "crossWalletBalance": 872.29511106,
      "walletBalance": 872.29511106
    }],
    "updatedPositions": [{
      "symbol": "BNBUSDT",
      "positionAmount": 0.02,
      "entryPrice": 406.09,
      "accumulatedRealisedPreFee": -0.0038,
      "unrealisedPnl": 0.00358343,
      "marginType": "cross",
      "isolatedWalletAmount": 0,
      "positionSide": "BOTH"
    }]
  }
};

const exemple_1_orderUpdate_BuyMarket_PartialFilled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646146064282,
  "transactionTime": 1646146064277,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_F5CNSgkUd5Rxp4UN4eWw",
    "orderSide": "BUY",
    "orderType": "MARKET",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 0,
    "averagePrice": 406.09,
    "stopPrice": 0,
    "executionType": "TRADE",
    "orderStatus": "PARTIALLY_FILLED",
    "orderId": 37834399493,
    "lastFilledQuantity": 0.02,
    "orderFilledAccumulatedQuantity": 0.02,
    "lastFilledPrice": 406.09,
    "commissionAsset": "USDT",
    "commissionAmount": 0.00324872,
    "orderTradeTime": 1646146064277,
    "tradeId": 647533313,
    "bidsNotional": 0,
    "asksNotional": 0,
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

const exemple_1_balanceUpdate_BuyMarket_PartialFilled_2 = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646146064282,
  "transactionId": 1646146064277,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [{
      "asset": "USDT",
      "balanceChange": 0,
      "crossWalletBalance": 872.29186234,
      "walletBalance": 872.29186234
    }],
    "updatedPositions": [{
      "symbol": "BNBUSDT",
      "positionAmount": 0.04,
      "entryPrice": 406.09,
      "accumulatedRealisedPreFee": -0.0038,
      "unrealisedPnl": 0.00716686,
      "marginType": "cross",
      "isolatedWalletAmount": 0,
      "positionSide": "BOTH"
    }]
  }
};

const exemple_1_orderUpdate_BuyMarket_PartialFilled_2 = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646146064283,
  "transactionTime": 1646146064277,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_F5CNSgkUd5Rxp4UN4eWw",
    "orderSide": "BUY",
    "orderType": "MARKET",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 0,
    "averagePrice": 406.09,
    "stopPrice": 0,
    "executionType": "TRADE",
    "orderStatus": "PARTIALLY_FILLED",
    "orderId": 37834399493,
    "lastFilledQuantity": 0.02,
    "orderFilledAccumulatedQuantity": 0.04,
    "lastFilledPrice": 406.09,
    "commissionAsset": "USDT",
    "commissionAmount": 0.00324872,
    "orderTradeTime": 1646146064277,
    "tradeId": 647533314,
    "bidsNotional": 0,
    "asksNotional": 0,
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

const exemple_1_balanceUpdate_BuyMarket_Filled = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646146064283,
  "transactionId": 1646146064277,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [{
      "asset": "USDT",
      "balanceChange": 0,
      "crossWalletBalance": 872.13592378,
      "walletBalance": 872.13592378
    }],
    "updatedPositions": [{
      "symbol": "BNBUSDT",
      "positionAmount": 1,
      "entryPrice": 406.09,
      "accumulatedRealisedPreFee": -0.0038,
      "unrealisedPnl": 0.17917159,
      "marginType": "cross",
      "isolatedWalletAmount": 0,
      "positionSide": "BOTH"
    }]
  }
};

const exemple_1_orderUpdate_BuyMarket_Filled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646146064283,
  "transactionTime": 1646146064277,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_F5CNSgkUd5Rxp4UN4eWw",
    "orderSide": "BUY",
    "orderType": "MARKET",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 0,
    "averagePrice": 406.09,
    "stopPrice": 0,
    "executionType": "TRADE",
    "orderStatus": "FILLED",
    "orderId": 37834399493,
    "lastFilledQuantity": 0.96,
    "orderFilledAccumulatedQuantity": 1,
    "lastFilledPrice": 406.09,
    "commissionAsset": "USDT",
    "commissionAmount": 0.15593856,
    "orderTradeTime": 1646146064277,
    "tradeId": 647533315,
    "bidsNotional": 0,
    "asksNotional": 0,
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


// ---------------------------------------------------------------------------------------------------
//  FUTURES venda 1 BNB a mercat
// ---------------------------------------------------------------------------------------------------

const exemple_1_orderUpdate_SellMarket_New = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646146123736,
  "transactionTime": 1646146123726,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_pULPWNBHGumTA9p50vy4",
    "orderSide": "SELL",
    "orderType": "MARKET",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 0,
    "averagePrice": 0,
    "stopPrice": 0,
    "executionType": "NEW",
    "orderStatus": "NEW",
    "orderId": 37834417654,
    "lastFilledQuantity": 0,
    "orderFilledAccumulatedQuantity": 0,
    "lastFilledPrice": 0,
    "commissionAmount": null,
    "orderTradeTime": 1646146123726,
    "tradeId": 0,
    "bidsNotional": 0,
    "asksNotional": 0,
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

const exemple_1_balanceUpdate_SellMarket_PartialFilled = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646146123736,
  "transactionId": 1646146123726,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [{
      "asset": "USDT",
      "balanceChange": 0,
      "crossWalletBalance": 872.19607442,
      "walletBalance": 872.19607442
    }],
    "updatedPositions": [{
      "symbol": "BNBUSDT",
      "positionAmount": 0.71,
      "entryPrice": 406.09,
      "accumulatedRealisedPreFee": 0.1035,
      "unrealisedPnl": 0.3053,
      "marginType": "cross",
      "isolatedWalletAmount": 0,
      "positionSide": "BOTH"
    }]
  }
};

const exemple_1_orderUpdate_SellMarket_PartialFilled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646146123736,
  "transactionTime": 1646146123726,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_pULPWNBHGumTA9p50vy4",
    "orderSide": "SELL",
    "orderType": "MARKET",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 0,
    "averagePrice": 406.46,
    "stopPrice": 0,
    "executionType": "TRADE",
    "orderStatus": "PARTIALLY_FILLED",
    "orderId": 37834417654,
    "lastFilledQuantity": 0.29,
    "orderFilledAccumulatedQuantity": 0.29,
    "lastFilledPrice": 406.46,
    "commissionAsset": "USDT",
    "commissionAmount": 0.04714936,
    "orderTradeTime": 1646146123726,
    "tradeId": 647534125,
    "bidsNotional": 0,
    "asksNotional": 0,
    "isMakerTrade": false,
    "isReduceOnly": false,
    "stopPriceWorkingType": "CONTRACT_PRICE",
    "originalOrderType": "MARKET",
    "positionSide": "BOTH",
    "isCloseAll": false,
    "trailingStopActivationPrice": null,
    "trailingStopCallbackRate": null,
    "realisedProfit": 0.1073
  }
};

const exemple_1_balanceUpdate_SellMarket_Filled = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646146123736,
  "transactionId": 1646146123726,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [{
      "asset": "USDT",
      "balanceChange": 0,
      "crossWalletBalance": 872.33624262,
      "walletBalance": 872.33624262
    }],
    "updatedPositions": [{
      "symbol": "BNBUSDT",
      "positionAmount": 0,
      "entryPrice": 0,
      "accumulatedRealisedPreFee": 0.3591,
      "unrealisedPnl": 0,
      "marginType": "cross",
      "isolatedWalletAmount": 0,
      "positionSide": "BOTH"
    }]
  }
};

const exemple_1_orderUpdate_SellMarket_Filled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646146123736,
  "transactionTime": 1646146123726,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_pULPWNBHGumTA9p50vy4",
    "orderSide": "SELL",
    "orderType": "MARKET",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 0,
    "averagePrice": 406.4529,
    "stopPrice": 0,
    "executionType": "TRADE",
    "orderStatus": "FILLED",
    "orderId": 37834417654,
    "lastFilledQuantity": 0.71,
    "orderFilledAccumulatedQuantity": 1,
    "lastFilledPrice": 406.45,
    "commissionAsset": "USDT",
    "commissionAmount": 0.1154318,
    "orderTradeTime": 1646146123726,
    "tradeId": 647534126,
    "bidsNotional": 0,
    "asksNotional": 0,
    "isMakerTrade": false,
    "isReduceOnly": false,
    "stopPriceWorkingType": "CONTRACT_PRICE",
    "originalOrderType": "MARKET",
    "positionSide": "BOTH",
    "isCloseAll": false,
    "trailingStopActivationPrice": null,
    "trailingStopCallbackRate": null,
    "realisedProfit": 0.2556
  }
};