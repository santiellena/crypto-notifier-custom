const user = require('../components/user/network');
const auth = require('../components/auth/network');
const binance = require('../components/binance/network');

const { notFound } = require('../../utils/error');

const routes = (server) => {

    server.use('/api/user', user);
    server.use('/api/auth', auth);
    server.use('/api/binance', binance);

    server.use(notFound); //Catch 404
}

//Exports routes to receive them on the server
module.exports = routes;