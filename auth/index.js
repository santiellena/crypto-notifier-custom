const jwt = require('jsonwebtoken')
const configs = require('../config')

function auth(data){
    const token = jwt.sign({userData: data}, configs.jwt.secret, {
        expiresIn: 60 * 60 * 24 * 7
    })
    return token
}

module.exports = auth