const boom = require('@hapi/boom');
const bcrypt = require("bcrypt");
const auth = require('../../../auth');

const collection = 'user';

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        
        throw boom.internal('No injected database');
    }
    const insert = async (data) => {
        return await store.insert(collection, data);
    };

    const login = async(email, password) => {
        const data = await store.searchEmail(collection, email, `/searchEmail?email=${email}`)
        if (!data) {
            throw boom.badRequest('Email or password incorrect');
        }
        if (!bcrypt.compareSync(password, data.password)) {
            throw boom.badRequest("Email or password invalid");
        }
        delete data.password
        return auth.auth(data)
    }

    return {
        insert,
        login
    }

}