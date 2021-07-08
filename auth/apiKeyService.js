const axios = require('axios');
const collection = 'api-key';
const config = require('../config');
const URL = `${config.mongoService.host}:${config.mongoService.port}/${collection}`;
const boom = require('@hapi/boom');

const getToken = async (token) => {
    try{
    const { data } = await axios({
        url: URL,
        method: 'get',
        data: {
            token,
        },
    });

    return data.body;
    } catch (err){

        throw boom.badRequest('Wrong API Key Token');
    };
};

module.exports = getToken;