export const config = {
    binance: {
        baseUrl: process.env.BASE_URL || 'https://data-api.binance.vision/api/v3/',
        historicalMarketData: {
            urlSuffix: process.env.HISTORICAL_MARKET_DATA_URL || 'trades',
            timeRange:  process.env.HISTORICAL_MARKET_TIME_RANGE || 1,
        }
    }
}
