const express = require('express');
const router = express.Router();

const response = require('../../../network/response');
const store = require('./store');

router.post('/', (req, res) => {
    
    store.insert(req.body)
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(e => {
        response.error(req, res, 'Internal Server Error', 500, e);
    });
});

router.get('/', (req, res) => {
    
    store.get(req.body.token)
    .then(data => {

        response.success(req, res, data, 200);
    })
    .catch(e => {
        
        response.error(req, res, 'Bad Request', 400);
    });
});

module.exports = router;