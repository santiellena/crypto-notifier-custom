const Binance = require('node-binance-api');
const config = require('../config');
const binance = new Binance().options({
  APIKEY: config.binance.apiKey,
  APISECRET: config.binance.apiSecret,
});

module.exports = binance;