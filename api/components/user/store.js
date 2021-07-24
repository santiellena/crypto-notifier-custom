const axios = require('axios');
const boom = require('@hapi/boom');
const collection = 'user';
const config = require('../../../config');

const URL = `${config.mongoService.host}:${config.mongoService.port}/${collection}`;

const get = async (id) => {
    try{
    const { data } = await axios({
        url: `${URL}/${id}`,
        method: 'get',
    });
    
    return data;
    } catch(err){

        throw boom.badRequest();
    }
};

const list = async () => {

    const { data } = await axios({
        url: `${URL}`,
        method: 'get',
    });

    return data;
};

const addMediaList = async (toSend) => {

    const { data } = await axios({
        url: `${URL}/addMediaList`,
        method: 'put',
        data: toSend,
    });

    return data;
};


const addCrypto = async(toSend) => {
    const { data } = await axios({
        url: `${URL}/addcrypto`,
        method: 'put',
        data: toSend
    }) 

    return data

}


module.exports = {
    get,
    list,
    addMediaList,
    addCrypto
};