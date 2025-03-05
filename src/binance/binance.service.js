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
        const url = `${this.binanceApiBaseUrl}${this.historicalMarketDataUrlSuffix}?symbol=${symbol}`;

        const response = await this.#fetch(url)

        const historicalTrades = await response.json();

        const historicalTradesTimeStamps = historicalTrades.map((trade) => {
            return trade.time
        })

        const latestHistoricalTradesTimestamp = Math.max(...historicalTradesTimeStamps)

        const historicalTradesWithinTimeRange = []
        historicalTrades.forEach((trade) => {
            if (trade.time >= latestHistoricalTradesTimestamp - this.historicalMarketDataTimeRange) {

                historicalTradesWithinTimeRange.push(trade)
            }
        })

        return historicalTradesWithinTimeRange
    }

    getChangeInPrice(trades) {
        trades.sort((a, b) => {
            console.log('a')
            console.log(a)
            console.log('b')
            console.log(b)

            console.log('a.price')
            console.log(a.price)
            console.log('b.price')
            console.log(b.price)

            const aPrice = a.price
            const bPrice = b.price

            if (aPrice < bPrice) {
                return -1;
            }

            if (aPrice > bPrice) {
                return 1;
            }

            return 0;
        });

        const changeInPrice = trades[0].price - trades[-1].price
        console.log('changeInPrice')
        console.log(changeInPrice)

        return changeInPrice
    }

    async #fetch(url, counter = 0) {
        let response

        try {
            response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            return response
        } catch (error) {
            if (counter >= 5) { // TODO: remove magic number
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