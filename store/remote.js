const axios = require('axios');

function createRemoteDB (host, port){
    const URL = `${host}:${port}`;

    const req = (method, collection, data) => {

        let url = `${URL}/${collection}`;

        body = data ? data : '';

        return new Promise((resolve, reject) => {

            axios({
                method,
                url,
                body,
            })
            .then(response => resolve(response.data.body))
            .catch(err => reject(err));
           

        });
    }

    const list = (collection) => {

        return req('GET', collection);
    };

    //const get = (collection, id) => {}
    //const insert = (collection, data) => {}
    //const insert = (collection, id, data) => {}

    return {
        list,
    }
}

module.exports = createRemoteDB;