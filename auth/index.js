const jwt = require('jsonwebtoken');
const configs = require('../config');
const error  = require('../utils/error');

function auth(data){
    const token = jwt.sign({userData: data}, configs.jwt.secret, {
        expiresIn: 60 * 60 * 24 * 7
    })
    return token
}

const verify = (token) => {
    try{
        return jwt.verify(token, secret);
    }catch(error){
        throw error(error, 401);
    };
}

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req);
        if(decoded.id !== owner){

            throw error('Access denied', 401);
        };
        return true;
    },

}

const getToken = (auth) => {

    if(!auth){
        throw error('There is not TOKEN', 401);
    }
    if(auth.indexOf('Bearer ', '') == -1){
        throw error('Incorrect TOKEN information', 401);
    }

    let token = auth.replace('Bearer ', '');
    
    return token;
}

const decodeHeader = (req) => {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
};

module.exports = {
    auth,
    check,
}