const express = require('express');
const router = express.Router();

const response = require('../../../network/response');
const store = require('./store');

router.post('/', (req, res, next) => {

    store.insert(req.body)
    .then(data => {

        response.success(req, res, data, 200);
    })
    .catch(e => {
        console.log(e)
        response.error(req, res, e, 400);
    });
});

router.get('/searchEmail', (req,res,next) => {
    store.searchEmail(req.query.email)
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, e, 400);
    });
})


router.get('/', (req, res, next) => {

    store.list()
    .then(data => {

        response.success(req, res, data, 200);
    })
    .catch(e => {
        console.log(e)
        response.error(req, res, e, 400);
    });
    
});

router.get('/:id', (req, res, next) => {
  
    store.get(req.params.id)
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, e, 400);
    });
    
});

 

module.exports = router;