export const config = {
    binance: {
        historicalMarketDataUrlSuffix: process.env.HISTORICAL_MARKET_DATA_URL || 'exchangeInfo'
        baseUrl: process.env.BASE_URL || 'https://data-api.binance.vision/api/v3/'
    }
}
