import { BinanceService } from "./binance/binance.service";
import * as dotenv from 'dotenv'

dotenv.config()

import { config } from './config'

const main = async (symbol) => {
    const binanceService = new BinanceService(
        config.binance.historicalMarketData.baseUrl,
        config.binance.historicalMarketData.urlSuffix,
        config.binance.historicalMarketData.timeRange,
    )

    const historicalMarketData = await binanceService.fetchHistoricalMarketData(symbol)


}

// TODO: add arguments from command line etc.
const mockInsert =

await main()
