
const exemple_3_balanceUpdate_Inicial = {
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

// ---------------------------------------------------------------------------------------------------
//  FUTURES compra 1 BNB a límit
// ---------------------------------------------------------------------------------------------------

const exemple_3_orderUpdate_BuyLimit_New = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646148172560,
  "transactionTime": 1646148172553,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_YI4nxEpDJbdSBDsI8oGV",
    "orderSide": "BUY",
    "orderType": "LIMIT",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 406,
    "averagePrice": 0,
    "stopPrice": 0,
    "executionType": "NEW",
    "orderStatus": "NEW",
    "orderId": 37835110602,
    "lastFilledQuantity": 0,
    "orderFilledAccumulatedQuantity": 0,        
    "lastFilledPrice": 0,
    "commissionAmount": null,
    "orderTradeTime": 1646148172553,
    "tradeId": 0,
    "bidsNotional": 406,
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
}

const exemple_3_balanceUpdate_BuyLimit_Filled = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646148189064,
  "transactionId": 1646148189057,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [
      {
        "asset": "USDT",
        "balanceChange": 0,
        "crossWalletBalance": 872.08754823, 
        "walletBalance": 872.08754823       
      }
    ],
    "updatedPositions": [
      {
        "symbol": "BNBUSDT",
        "positionAmount": 1,
        "entryPrice": 406,
        "accumulatedRealisedPreFee": 0.5151,
        "unrealisedPnl": 0.07796903,        
        "marginType": "cross",
        "isolatedWalletAmount": 0,
        "positionSide": "BOTH"
      }
    ]
  }
}

const exemple_3_orderUpdate_BuyLimit_Filled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646148189064,
  "transactionTime": 1646148189057,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_YI4nxEpDJbdSBDsI8oGV",
    "orderSide": "BUY",
    "orderType": "LIMIT",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 406,
    "averagePrice": 406,
    "stopPrice": 0,
    "executionType": "TRADE",
    "orderStatus": "FILLED",
    "orderId": 37835110602,
    "lastFilledQuantity": 1,
    "orderFilledAccumulatedQuantity": 1,        
    "lastFilledPrice": 406,
    "commissionAsset": "USDT",
    "commissionAmount": 0.08119999,
    "orderTradeTime": 1646148189057,
    "tradeId": 647574891,
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
}


// ---------------------------------------------------------------------------------------------------
//  FUTURES venda 1 BNB a límit
// ---------------------------------------------------------------------------------------------------

const exemple_3_orderUpdate_SellLimit_New = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646148271965,
  "transactionTime": 1646148271958,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_pEBQZB2YDnc0u6xLGKXn",
    "orderSide": "SELL",
    "orderType": "LIMIT",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 406.5,
    "averagePrice": 0,
    "stopPrice": 0,
    "executionType": "NEW",
    "orderStatus": "NEW",
    "orderId": 37835140190,
    "lastFilledQuantity": 0,
    "orderFilledAccumulatedQuantity": 0,
    "lastFilledPrice": 0,
    "commissionAmount": null,
    "orderTradeTime": 1646148271958,
    "tradeId": 0,
    "bidsNotional": 0,
    "asksNotional": 406.5,
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
}

const exemple_3_balanceUpdate_SellLimit_Filled = {
  "eventType": "ACCOUNT_UPDATE",
  "eventTime": 1646148300211,
  "transactionId": 1646148300201,
  "updateData": {
    "updateEventType": "ORDER",
    "updatedBalances": [
      {
        "asset": "USDT",
        "balanceChange": 0,
        "crossWalletBalance": 872.50624823,
        "walletBalance": 872.50624823
      }
    ],
    "updatedPositions": [
      {
        "symbol": "BNBUSDT",
        "positionAmount": 0,
        "entryPrice": 0,
        "accumulatedRealisedPreFee": 1.0151,
        "unrealisedPnl": 0,
        "marginType": "cross",
        "isolatedWalletAmount": 0,
        "positionSide": "BOTH"
      }
    ]
  }
}

const exemple_3_orderUpdate_SellLimit_Filled = {
  "eventType": "ORDER_TRADE_UPDATE",
  "eventTime": 1646148300211,
  "transactionTime": 1646148300201,
  "order": {
    "symbol": "BNBUSDT",
    "clientOrderId": "web_pEBQZB2YDnc0u6xLGKXn",
    "orderSide": "SELL",
    "orderType": "LIMIT",
    "orderTimeInForce": "GTC",
    "originalQuantity": 1,
    "originalPrice": 406.5,
    "averagePrice": 406.5,
    "stopPrice": 0,
    "executionType": "TRADE",
    "orderStatus": "FILLED",
    "orderId": 37835140190,
    "lastFilledQuantity": 1,
    "orderFilledAccumulatedQuantity": 1,
    "lastFilledPrice": 406.5,
    "tradeId": 647576129,
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
    "realisedProfit": 0.5
  }
}