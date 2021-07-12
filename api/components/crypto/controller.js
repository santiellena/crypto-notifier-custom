const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const apiKeyService = require('../../../auth/apiKeyService');
const userController = require('../user/controller');
const binance = require('../../../utils/binanceConfig');
const { socket } = require('../../socket');
const { default: axios } = require('axios');

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        
        throw boom.internal('No injected database');
    }

    const getChartInfo = async (marketAlias) => {
      
        if(!marketAlias){

            throw boom.badRequest('There is not market alias');
        }
        await binance.websockets.chart(marketAlias, "1h", async (symbol, interval, chart) => {
            let tick = binance.last(chart);
            const lastPrice = chart[tick].close;
            // Optionally convert 'chart' object to array:
            // let ohlc = binance.ohlc(chart);
            // console.info(symbol, ohlc);

            socket.io.emit('price', lastPrice);
        });

        return marketAlias;
    }
    
    async function getAllCryptos(){
        axios({
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false'
        })
        .then(res => {
            console.log(res.data[0].image);
        })
        .catch(err => console.log(err.response))
    }

    return {
        getChartInfo,
        getAllCryptos
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