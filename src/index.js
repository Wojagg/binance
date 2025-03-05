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

    const decreaseInPrice = await binanceService.getDecreaseInPrice(historicalMarketData)
    const increaseInPrice = await binanceService.getIncreaseInPrice(historicalMarketData)
}

// TODO: add arguments from command line etc.
const mockInsert = 'BTCUSDT'

try {
    await main(mockInsert)
} catch(error) {
    if(error instanceof HttpException) {
        console.log(`Error while fetching, ${error.message}, status code: ${error.statusCode}`)
    }
}
