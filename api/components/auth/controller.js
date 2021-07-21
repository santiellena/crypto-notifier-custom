const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const apiKeyService = require('../../../auth/apiKeyService');

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        
        throw boom.internal('No injected database');
    }
    const insert = async (data) => {
        if(!data.username || !data.fullName || !data.email || !data.password){

            throw boom.badRequest('Incomplete fields');
        }

        const response = await store.insert(data);
        if (response) {
            return true
        }else{
            return false
        }
    };

    const findEmail = async(data) => {
        const response = await store.searchEmail(data)
        if (response) {
            return true
        }else{
            return false
        }
    }

    const findUsename = async data => {
        const response = await store.searchUsername(data)
        console.log(response);
        if (response) {
            return true
        }else{
            return false
        }
    }
  
    const verify = async(data) => {
        return await store.verifyEmail(collection, data, '/verifyemail')
    }

    const login = async(email, password, apiKeyToken) => {
        
        const data = await store.searchEmail(email);
        if (!data) {
            throw boom.badRequest('Email or password incorrect');
        };

        if(!apiKeyToken){
            throw boom.unauthorized('API Key Token needed');
        };

        const apiKey = await apiKeyService(apiKeyToken);
        return bcrypt.compare(password, data.password)
        .then(equal => {
            if(equal == true){
               const tokenData = {
                    id: data._id,
                    scopes: apiKey.scopes,
                };
                console.log(tokenData);
                return auth.auth(tokenData);  //Returns TOKEN
            } else{

                return boom.unauthorized('Incorrect Information', 401);
            };
        })
        .catch();

    }

    return {
        insert,
        login,
        verify,
        findEmail,
        findUsename
    }

}