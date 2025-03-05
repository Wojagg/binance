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
        config.binance.maxRetries,
    )

    const historicalMarketData = await binanceService.fetchHistoricalMarketData(symbol)

    let changeInPrice = await binanceService.getChangeInPrice(historicalMarketData)

    console.log(
        getResultString(changeInPrice)
    )
}

try {
    await main('BTCUSDT')
} catch (error) {
    if (error instanceof HttpException) {
        console.log(`Error while communicating through http, ${error.message}, status code: ${error.statusCode}`)
        process.exit()
    }

    console.log(`error occurred: ${error.message}`)
    process.exit(1)
}

function getResultString (changeInPrice) {
    let changeText
    if (changeInPrice > 0) {
        changeText = 'increased'
    }

    if (changeInPrice < 0) {
        changeText = 'decreased'
    }

    if (changeInPrice > 0) {
        return 'price stayed the same in the last ${config.binance.historicalMarketData.timeRange} milliseconds'
    }

    changeInPrice = Math.abs(changeInPrice)

    return `Price ${changeText} by ${changeInPrice} in the last ${config.binance.historicalMarketData.timeRange} milliseconds`
}
