"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBinanceKline = void 0;
function parseBinanceKline(data) {
    return {
        openTime: +data[0],
        open: +data[1],
        high: +data[2],
        low: +data[3],
        close: +data[4],
        volume: +data[5],
        closeTime: +data[6],
        quoteVolume: +data[7],
        trades: +data[8],
        takerBaseVolume: +data[9],
        takerQuotequoteVolume: +data[10],
    };
}
exports.parseBinanceKline = parseBinanceKline;
//# sourceMappingURL=binance-futures.types.js.map