const express = require('express');
const router = express.Router();

const controller = require('./index');
const response = require('../../../network/response');
const secure = require('../../../utils/middlewares/secure');

router.get('/:id', secure('get'), (req, res, next) => {

    controller.get(req.params.id)
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(next);
});

module.exports = router;