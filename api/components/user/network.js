const express = require('express');
const router = express.Router();

const controller = require('./index');
const response = require('../../../network/response');

router.get('/', (req, res) => {

    controller.list()
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, e, 400);
    });
});

module.exports = router;