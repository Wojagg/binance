import { BinanceService } from "./binance/binance.service";
import * as dotenv from 'dotenv'

dotenv.config()

import { config } from './config'

const main = async (symbol) => {
    const binanceService = new BinanceService(
        config.binance.baseUrl,
        config.binance.historicalMarketDataUrlSuffix,
    )

    const historicalMarketData = await binanceService.fetchHistoricalMarketData(symbol)
}

await main()
