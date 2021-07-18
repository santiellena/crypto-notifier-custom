const axios = require('axios');
const boom = require('@hapi/boom');
const collection = 'user';
const config = require('../../../config');
const URL = `${config.mongoService.host}:${config.mongoService.port}`;

const searchEmail = async (email) => {
    console.log(`${URL}/${collection}/searchEmail?email=${email}`);
        const { data } = await axios({
            url: `${URL}/${collection}/searchEmail?email=${email}`,
            method: 'get',
        });
        
        return data.body;
};

const insert = async (userData) => {

    const { data } = await axios({
        url: `${URL}/${collection}`,
        method: 'post',
        data: userData,
    });
    
    return data;
};

module.exports = {
    searchEmail,
    insert,
}