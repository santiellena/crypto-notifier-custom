const error = require('../../../utils/error')
const auth = require('../auth/index')

const collection = 'user';

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        
        throw error('No Injected Database', 500);
    }

    const list = async () => {

        return await store.list(collection);
    };

    return {
        list,
    }

}