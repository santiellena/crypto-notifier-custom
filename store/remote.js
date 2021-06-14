const axios = require('axios');

function createRemoteDB (host, port){
    const URL = `${host}:${port}`;

    const req = (method, collection, data, action) => {

        let url = `${URL}/${collection}${action ? action : ''}`;

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
    const insert = (collection, data) => {
        return req('POST', collection, data)
    }

    const searchEmail = (collection, data, action) => {
        return req('GET', collection, data, action)
    }



    //const get = (collection, id) => {}
    //const insert = (collection, id, data) => {}

    return {
        list,
        insert,
        searchEmail
    }
}

module.exports = createRemoteDB;