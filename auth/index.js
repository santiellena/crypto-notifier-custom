const jwt = require('jsonwebtoken');
const configs = require('../config');
const boom = require('@hapi/boom');
const secret = configs.jwt.secret;

function auth(data){
    const token = jwt.sign(data, secret, {
        expiresIn: 60 * 60 * 24 * 7
    })
    return token;
}

const verify = (token) => {
    try{
        return jwt.verify(token, configs.jwt.secret);
    }catch(error){
        throw boom.badRequest('Wrong JWT');
    };
};

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req);
        if(decoded._id !== owner){

            throw boom.unauthorized('Access denied');
        };
        return true;
    },

}

const getToken = (auth) => {

    if(!auth){
        throw boom.badRequest('There is not TOKEN');
    }
    if(auth.indexOf('Bearer ', '') == -1){
        throw boom.badRequest('Incorrect TOKEN information');
    }

    let token = auth.replace('Bearer ', '');
    
    return token;
}

const decodeHeader = (req) => {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    return decoded;
};

module.exports = {
    auth,
    check,
}