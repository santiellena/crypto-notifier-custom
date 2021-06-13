const error = require('../../../utils/error')

const collection = 'user';

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        
        throw error('No Injected Database', 500);
    }
    const insert = async (data) => {
        return await store.insert(collection, data);
    };

    return {
        insert,
    }

}