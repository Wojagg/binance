import {HttpException} from "../exception/httpException.js";

export class BinanceService {
    binanceApiBaseUrl
    historicalMarketDataUrlSuffix
    historicalMarketDataTimeRange
    maxRetries

    constructor(binanceApiBaseUrl, historicalMarketDataUrlSuffix, historicalMarketDataTimeRange, maxRetries) {
        this.binanceApiBaseUrl = binanceApiBaseUrl
        this.historicalMarketDataUrlSuffix = historicalMarketDataUrlSuffix
        this.historicalMarketDataTimeRange = historicalMarketDataTimeRange
        this.maxRetries = maxRetries
    }

    async fetchHistoricalMarketData(symbol) {
        const response = await this.#fetch(
            `${this.binanceApiBaseUrl}${this.historicalMarketDataUrlSuffix}?symbol=${symbol}`
        )

        const historicalTrades = await response.json();

        const historicalTradesTimeStamps = historicalTrades.map((trade) => {
            return trade.time
        })

        const historicalTradesWithinTimeRange = []
        historicalTrades.forEach((trade) => {
            if (trade.time >= Math.max(...historicalTradesTimeStamps) - this.historicalMarketDataTimeRange) {

                historicalTradesWithinTimeRange.push(trade)
            }
        })

        return historicalTradesWithinTimeRange
    }

    getChangeInPrice(trades) {
        trades.sort((a, b) => {
            if (a.time < b.time) {
                return -1;
            }

            if (a.time > b.time) {
                return 1;
            }

            return 0;
        })

        return trades[0].price - trades[trades.length - 1].price
    }

    async #fetch(url, counter = 0) {
        let response

        try {
            response = await fetch(url);
            if (!response.ok) {
                throw new Error();
            }

            return response
        } catch (error) {
            if (this.maxRetries >= 5) {
                if (response) {
                    console.error('Something went wrong during fetching the data from binance');
                    throw HttpException(error.message, response.status)
                }

                throw HttpException('internal application error', 500)
            }
            console.log(`Unable to connect to binance API, retrying for ${counter} time...`);
            return await this.#fetch(url, counter)
        }
    }
}