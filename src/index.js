import { BinanceService } from "./binance/binance.service";
import * as dotenv from 'dotenv'

dotenv.config()

import { config } from './config'

const main = (symbol) => {
    const binanceService = new BinanceService(
        config.binance.baseUrl,
        config.binance.historicalMarketDataUrlSuffix,
    )


}

main()
