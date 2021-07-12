const express = require('express');
const router = express.Router();

const controller = require('./index');
const response = require('../../../network/response');

router.get('/', (req, res, next) => {
    controller.getChartInfo(req.query.alias)
    .then(symbol => {
        response.success(req, res, symbol, 200);
    })
    .catch(err => {
        response.error(req, res, err, 500, err);
    });
});

module.exports = router;