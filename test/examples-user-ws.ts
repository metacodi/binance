
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

