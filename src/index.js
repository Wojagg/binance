import { BinanceService } from "./binance/binance.service.js";
import * as dotenv from 'dotenv'
import { config } from './config.js'

dotenv.config()

const main = async (symbol) => {
    const binanceService = new BinanceService(
        config.binance.baseUrl,
        config.binance.historicalMarketData.urlSuffix,
        config.binance.historicalMarketData.timeRange,
    )

    const historicalMarketData = await binanceService.fetchHistoricalMarketData(symbol)


}

// TODO: add arguments from command line etc.
const mockInsert = 'BTCUSDT'

await main(mockInsert)
