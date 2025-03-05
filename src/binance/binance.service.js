export class BinanceService {
    binanceApiBaseUrl
    historicalMarketDataUrlSuffix

    constructor(binanceApiBaseUrl, historicalMarketDataUrlSuffix) {
        this.binanceApiBaseUrl = binanceApiBaseUrl
        this.historicalMarketDataUrlSuffix = historicalMarketDataUrlSuffix
    }

    async fetchHistoricalMarketData(symbol) {
        const url = `${this.binanceApiBaseUrl}${this.historicalMarketDataUrlSuffix}?symbol=${symbol}`;

        const data = await this.#fetch(url)
    }

    async #fetch(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error(error.message);
        }
    }
}