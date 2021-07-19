const axios = require('axios');
const boom = require('@hapi/boom');
const collection = 'user';
const config = require('../../../config');
const URL = `${config.mongoService.host}:${config.mongoService.port}`;

const searchEmail = async (email) => {
    const { data } = await axios({
        url: `${URL}/${collection}/searchEmail?email=${email}`,
        method: 'get',
    });
    return data.body;
};

const searchUsername = async (username) => {
    const { data } = await axios({
        url: `${URL}/${collection}/searchusername?username=${username}`
    })
    return data.body
}

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
    searchUsername
}