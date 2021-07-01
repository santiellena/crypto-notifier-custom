const axios = require('axios');

function createRemoteDB (host, port){
    const URL = `${host}:${port}`;

    const req = (method, collection, id, data, action) => {

        let url = `${URL}/${collection}${action ? action : ''}${id ? `/${id}` : ''}`;

        body = data ? data : '';

        return new Promise((resolve, reject) => {
            axios({
                method,
                url,
                data: body,
            })
            .then(response => resolve(response.data.body))
            .catch(err => reject(err));
           

        });
    }

    const list = (collection) => {

        return req('GET', collection);
    };

    const get = (collection, data, action ) => {
        return req('GET', collection, null, action)
    }
    

    const insert = (collection, data) => {
        return req('POST', collection, data)
    }

    const searchEmail = (collection, data, action) => {
        return req('GET', collection, data, action)
    }

    const get = (collection, id) => {
        
        return req('GET', collection, id);
    };

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
        get
    }
}

module.exports = createRemoteDB;