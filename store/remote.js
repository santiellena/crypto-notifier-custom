const request = require('request');

function createRemoteDB (host, port){
    const URL = `${host}:${port}`;

    const list = (collection) => {

        return req('GET', collection);
    };

    //const get = (collection, id) => {}
    //const insert = (collection, data) => {}
    //const insert = (collection, id, data) => {}

    const req = (method, collection, data) => {

        let url = `${URL}/${collection}`;

        body = '';

        return new Promise((resolve, reject) => {

            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body,
            }, (err, req, body) => {
                
                if(err){
                    console.error('Remote DB Error', err);
                    return reject(err.message);
                }

                const response = JSON.parse(body);
                return resolve(response.body);
            });
        });
    }

    return {
        list,
    }
}

module.exports = createRemoteDB;