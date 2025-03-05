import { HttpException } from "../exception/httpException.js";

export class BinanceService {
    binanceApiBaseUrl
    historicalMarketDataUrlSuffix
    historicalMarketDataTimeRange

    constructor(binanceApiBaseUrl, historicalMarketDataUrlSuffix, historicalMarketDataTimeRange) {
        this.binanceApiBaseUrl = binanceApiBaseUrl
        this.historicalMarketDataUrlSuffix = historicalMarketDataUrlSuffix
        this.historicalMarketDataTimeRange = historicalMarketDataTimeRange
    }

    async fetchHistoricalMarketData(symbol, timeRange) {
        const url = `${this.binanceApiBaseUrl}${this.historicalMarketDataUrlSuffix}?symbol=${symbol}`;

        const response = await this.#fetch(url)

        const historicalTrades = await response.json();

        const currentTimestamp = Date.now()

        let historicalTradesWithinTimeRange = []
        historicalTrades.forEach((trade) => {
            if (trade.time >= currentTimestamp - this.historicalMarketDataTimeRange) { // TODO: this if check should work but I don't see effects, maybe because of too much data in time range - before response is back many ms are passing
                historicalTradesWithinTimeRange.push(trade)
            }
        })

        return historicalTradesWithinTimeRange
    }

    async #fetch(url) {
        let response

        try {
            response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            return response
        } catch (error) {
            if (response) {
                console.error('Something went wrong during fetching the data from binance');
                throw HttpException(error.message, response.status)
            }

            throw HttpException('internal application error', 500)
        }
    }
}