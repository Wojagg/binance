import { BinanceService } from "./binance/binance.service.js";
import * as dotenv from 'dotenv'
import { config } from './config.js'
import { HttpException } from "./exception/httpException.js";

dotenv.config()

const main = async (symbol) => {
    const binanceService = new BinanceService(
        config.binance.baseUrl,
        config.binance.historicalMarketData.urlSuffix,
        config.binance.historicalMarketData.timeRange,
    )

    const historicalMarketData = await binanceService.fetchHistoricalMarketData(symbol)

    const decreaseInPrice = await binanceService.getChangeInPrice(historicalMarketData)
}

// TODO: add arguments from command line etc.
const mockInsert = 'BTCUSDT'

try {
    await main(mockInsert)
} catch (error) {
    if (error instanceof HttpException) {
        console.log(`Error while communicating through http, ${error.message}, status code: ${error.statusCode}`)
        process.exit()
    }

    console.log(`error occurred: ${error.message}`)
    process.exit(1)
}
