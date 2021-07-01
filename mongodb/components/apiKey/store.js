const model = require('./model');
const boom = require('@hapi/boom');

const get = async (token) => {
    if(!token){

        throw boom.badRequest();
    }
    return await model.findOne({token: token});
};

const insert = async (body) => {

    const keyData = {
        token: body.token,
        scopes: body.scopes,  
    };

    const newApiKey = await new model(keyData);
    newApiKey.save();

    return true;
};

module.exports = {
    get,
    insert,
}