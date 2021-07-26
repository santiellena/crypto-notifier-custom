const boom = require('@hapi/boom');
const CoinGecko = require('coingecko-api');
const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const apiKeyService = require('../../../auth/apiKeyService');
const userController = require('../user/controller');
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




    return {
        getCryptoData,
    }
}