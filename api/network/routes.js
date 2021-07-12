const user = require('../components/user/network');
const auth = require('../components/auth/network');
const crypto = require('../components/crypto/network');

const { notFound } = require('../../utils/error');

const routes = (server) => {

    server.use('/api/user', user);
    server.use('/api/auth', auth);
    server.use('/api/crypto', crypto);

    server.use(notFound); //Catch 404
}

//Exports routes to receive them on the server
module.exports = routes;