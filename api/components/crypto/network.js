const express = require('express');
const router = express.Router();

const controller = require('./index');
const response = require('../../../network/response');

router.get('/', (req, res, next) => {
    controller.getCryptoData(req.query.alias)
        .then(data => {
            if (data.success) {
                response.success(req, res, data.data, 200);
            } else {
                response.success(req, res, null, 200);
            }
        })
        .catch(err => {
            response.error(req, res, err, 500, err);
        });
});


router.get("/:id", (req, res, next) => {
    controller.getCryptoDataId(req.params.id)
    .then(data => {
        if (data) {
            response.success(req, res, data, 200);
        } else {
            response.success(req, res, null, 200);
        }
    })
    .catch(err => {
        response.error(req, res, err, 500, err);
    })
})

module.exports = router;