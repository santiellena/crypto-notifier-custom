const boom = require('@hapi/boom');
const CoinGecko = require('coingecko-api');
const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const apiKeyService = require('../../../auth/apiKeyService');
const userController = require('../user/controller');
const binance = require('../../../utils/binanceConfig');
const { socket } = require('../../socket');

const CoinGeckoClient = new CoinGecko();


module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        
        throw boom.internal('No injected database');
    }

    const getCryptoData = async() => {
        let data = await CoinGeckoClient.coins.all()
        return data
    }

    const getCryptoDataId = async(id) => {
        let data = await CoinGeckoClient.coins.fetchMarketChart(id, {
            interval: 'hourly'
        })
        return data.data.prices
    }



    return {
        getCryptoData,
        getCryptoDataId
    }
}
/*binance.candlesticks(['BNBUSDT'], "1m", (candlesticks) => {
    let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
    let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
    console.info(symbol+" "+interval+" candlestick update");
    console.info("open: "+open);
    console.info("high: "+high);
    console.info("low: "+low);
    console.info("close: "+close);
    console.info("volume: "+volume);
    console.info("isFinal: "+isFinal);
    const data = {
        main: `${symbol} ${interval} candlestick update`,
        open: open,
        close: close,
        high: high,
        low: low,
        volume: volume,
        isFinal: isFinal,
    }
  });
  resolve(data); */