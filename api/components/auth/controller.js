const error = require('../../../utils/error')
const bcrypt = require("bcrypt");
const auth = require('../../../auth');

const collection = 'user';

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        
        throw error('No Injected Database', 500);
    }
    const insert = async (data) => {
        return await store.insert(collection, data);
    };

    const verify = async(data) => {
        return await store.verifyEmail(collection, data, '/verifyemail')
    }


    const login = async(email, password) => {
        const data = await store.searchEmail(collection, email, `/searchEmail?email=${email}`)
        if (!data) {
            throw error("Email or password invalid", 400)
        }
        if (!bcrypt.compareSync(password, data.password)) {
            throw error("Email or password invalid", 400)
        }
        if (!data.active){
            throw error('Please, verify your email', 400)
        }
        delete data.password
        const token = auth.auth(data)
        return `Bearer ${token}`
    }

    return {
        insert,
        login,
        verify
    }

}