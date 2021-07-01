const axios = require('axios');

function createRemoteDB (host, port){
    const URL = `${host}:${port}`;

    const req = (method, collection, id, data, action) => {

        let url = `${URL}/${collection}${action ? action : ''}${id ? `/${id}` : ''}`;

        return new Promise(async (resolve, reject) => {
            await axios({
                method,
                url,
                data,
            })
            .then(response => resolve(response.data))
            .catch(err => reject(err));
           
        });
    }

    const list = (collection) => {

        return req('GET', collection);
    };

    const get = (collection, data, action ) => {
        return req('GET', collection, null, data, action)
    }
    

    const insert = (collection, data) => {

        return req('POST', collection, null, data);
    }

    const addMediaList = (collection, data, action) => {
        return req('PUT', collection, data, action)
    }


    const searchEmail = (collection, data, action) => {
        return req('GET', collection, null, data, action);
    };

    return {
        list,
        get,
        insert,
        searchEmail,
        addMediaList,
    }
}

module.exports = createRemoteDB;