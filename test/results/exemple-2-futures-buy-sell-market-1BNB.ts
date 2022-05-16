

const exemple_2_balanceUpdate_Inicial = {
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


// ---------------------------------------------------------------------------------------------------
//  FUTURES compra 1 BNB a mercat
// ---------------------------------------------------------------------------------------------------

const exemple_2_orderUpdate_BuyMarket_New = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646146786430,
  "transactionTime": 1646146786423,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_I4L5z0131mkYL8h0ELgu",
    "orderSide": "BUY",
    "orderType": "MARKET",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 0,
    "averagePrice": 0,
    "stopPrice": 0,
    "executionType": "NEW",
    "orderStatus": "NEW",
    "orderId": 37834658484,
    "lastFilledQuantity": 0,
    "orderFilledAccumulatedQuantity": 0,
    "lastFilledPrice": 0,
    "commissionAmount": null,
    "orderTradeTime": 1646146786423,
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
}

const exemple_2_balanceUpdate_BuyMarket_Filled = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646146786430,
  "transactionId": 1646146786423,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [
      {
        "asset": "USDT",
        "balanceChange": 0,
        "crossWalletBalance": 872.17452662,
        "walletBalance": 872.17452662
      }
    ],
    "updatedPositions": [
      {
        "symbol": "BNBUSDT",
        "positionAmount": 1,
        "entryPrice": 404.29,
        "accumulatedRealisedPreFee": 0.3591,
        "unrealisedPnl": 0.08395902,
        "marginType": "cross",
        "isolatedWalletAmount": 0,
        "positionSide": "BOTH"
      }
    ]
  }
}

const exemple_2_orderUpdate_BuyMarket_Filled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646146786430,
  "transactionTime": 1646146786423,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_I4L5z0131mkYL8h0ELgu",
    "orderSide": "BUY",
    "orderType": "MARKET",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 0,
    "averagePrice": 404.29,
    "stopPrice": 0,
    "executionType": "TRADE",
    "orderStatus": "FILLED",
    "orderId": 37834658484,
    "lastFilledQuantity": 1,
    "orderFilledAccumulatedQuantity": 1,
    "lastFilledPrice": 404.29,
    "commissionAsset": "USDT",
    "commissionAmount": 0.161716,
    "orderTradeTime": 1646146786423,
    "tradeId": 647547961,
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
}


// ---------------------------------------------------------------------------------------------------
//  FUTURES venda 1 BNB a mercat
// ---------------------------------------------------------------------------------------------------


const exemple_2_orderUpdate_SellMarket_New = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646146923900,
  "transactionTime": 1646146923893,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_a4M66ocjo2HkSjmTSlKm",
    "orderSide": "SELL",
    "orderType": "MARKET",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 0,
    "averagePrice": 0,
    "stopPrice": 0,
    "executionType": "NEW",
    "orderStatus": "NEW",
    "orderId": 37834713006,
    "lastFilledQuantity": 0,
    "orderFilledAccumulatedQuantity": 0,
    "lastFilledPrice": 0,
    "commissionAmount": null,
    "orderTradeTime": 1646146923893,
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
}

const exemple_2_balanceUpdate_SellMarket_PartialFilled = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646146923900,
  "transactionId": 1646146923893,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [
      {
        "asset": "USDT",
        "balanceChange": 0,
        "crossWalletBalance": 872.17310262,
        "walletBalance": 872.17310262
      }
    ],
    "updatedPositions": [
      {
        "symbol": "BNBUSDT",
        "positionAmount": 0.2,
        "entryPrice": 404.29,
        "accumulatedRealisedPreFee": 0.4871,
        "unrealisedPnl": 0.046,
        "marginType": "cross",
        "isolatedWalletAmount": 0,
        "positionSide": "BOTH"
      }
    ]
  }
}

const exemple_2_orderUpdate_SellMarket_PartialFilled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646146923900,
  "transactionTime": 1646146923893,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_a4M66ocjo2HkSjmTSlKm",
    "orderSide": "SELL",
    "orderType": "MARKET",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 0,
    "averagePrice": 404.45,
    "stopPrice": 0,
    "executionType": "TRADE",
    "orderStatus": "PARTIALLY_FILLED",
    "orderId": 37834713006,
    "lastFilledQuantity": 0.8,
    "orderFilledAccumulatedQuantity": 0.8,
    "lastFilledPrice": 404.45,
    "commissionAsset": "USDT",
    "commissionAmount": 0.129424,
    "orderTradeTime": 1646146923893,
    "tradeId": 647550988,
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
    "realisedProfit": 0.128
  }
}

const exemple_2_balanceUpdate_SellMarket_Filled = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646146923900,
  "transactionId": 1646146923893,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [
      {
        "asset": "USDT",
        "balanceChange": 0,
        "crossWalletBalance": 872.16874822,
        "walletBalance": 872.16874822
      }
    ],
    "updatedPositions": [
      {
        "symbol": "BNBUSDT",
        "positionAmount": 0,
        "entryPrice": 0,
        "accumulatedRealisedPreFee": 0.5151,
        "unrealisedPnl": 0,
        "marginType": "cross",
        "isolatedWalletAmount": 0,
        "positionSide": "BOTH"
      }
    ]
  }
}

const exemple_2_orderUpdate_SellMarket_Filled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646146923900,
  "transactionTime": 1646146923893,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_a4M66ocjo2HkSjmTSlKm",
    "orderSide": "SELL",
    "orderType": "MARKET",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 0,
    "averagePrice": 404.446,
    "stopPrice": 0,
    "executionType": "TRADE",
    "orderStatus": "FILLED",
    "orderId": 37834713006,
    "lastFilledQuantity": 0.2,
    "orderFilledAccumulatedQuantity": 1,
    "lastFilledPrice": 404.43,
    "commissionAsset": "USDT",
    "commissionAmount": 0.0323544,
    "orderTradeTime": 1646146923893,
    "tradeId": 647550989,
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
    "realisedProfit": 0.028
  }
}


