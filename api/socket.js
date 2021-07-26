const {Server} = require('socket.io');
const controller = require('./components/crypto/index')
const client = require('binance-api-node').default()


module.exports = async function(server) {
    const io = new Server(server, {
        cors: {
            origin: '*'
        }
    })
    let cryptosSymbol = []
    const {data} = await controller.getCryptoData()
    await data.forEach(crypto => {
        cryptosSymbol.push(crypto.symbol.toUpperCase() + "USDT")
    })

    client.ws.candles(cryptosSymbol,'5m', candle => {
        console.log({symbol: candle.symbol, close: Number.parseFloat(candle.close).toFixed(2)});
        io.sockets.emit("cryptoData", {symbol: candle.symbol, close: Number.parseFloat(candle.close).toFixed(2)})
    })

    

    io.on('connection', socket => {
        console.log("NEW CONNECTION");

        socket.on('disconnect',async data => {
            console.log("DISCONNECTED");
        })
    })
};