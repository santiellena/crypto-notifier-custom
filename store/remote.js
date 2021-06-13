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



    //const get = (collection, id) => {}
    //const insert = (collection, id, data) => {}

    return {
        list,
        insert,
    }
}

module.exports = createRemoteDB;