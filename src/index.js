import { BinanceService } from "./binance/binance.service";
import * as dotenv from 'dotenv'

dotenv.config()

const main = (symbol) => {
    const binanceService = new BinanceService()


}

main()
