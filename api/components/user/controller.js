const boom = require('@hapi/boom');
const auth = require('../auth/index')

const collection = 'user';

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        
        throw boom.internal('No injected database');
    }

    const list = async () => {

        return await store.list(collection);
    };

    const get = async (id) => {
        const data = await store.get(collection, id);
        delete data.password;
        return data
    };

    return {
        list,
        get,
    }

}