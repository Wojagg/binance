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

    async fetchHistoricalMarketData(symbol) {
        const currentTimestamp = Date.now()

        const url = `${this.binanceApiBaseUrl}${this.historicalMarketDataUrlSuffix}?symbol=${symbol}&startTime=${currentTimestamp - this.historicalMarketDataTimeRange}`;

        const response = await this.#fetch(url)

        const historicalTrades = await response.json();
        console.log('historicalTrades')
        console.log(historicalTrades)

        return historicalTrades
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