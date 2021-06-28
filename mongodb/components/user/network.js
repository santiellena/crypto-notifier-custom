const express = require('express');
const router = express.Router();

const response = require('../../../network/response');
const store = require('./store');


/* POST REQUEST */

//create user
router.post('/', (req, res, next) => {

    store.insert(req.body)
    .then(data => {

        response.success(req, res, data, 200);
    })
    .catch(e => {
        console.log(e)
        response.error(req, res, e, 400, e);
    });
});


/* GET REQUEST */

//find email
router.get('/searchEmail', (req,res,next) => {
    store.searchEmail(req.query.email)
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, e, 400);
    });
})

//get user
router.get('/', (req, res, next) => {

    store.list(req.params.collection)
    .then(data => {

        response.success(req, res, data, 200);
    })
    .catch(e => {
        console.log(e)
        response.error(req, res, e, 400);
    });
    
});

//get unique user
router.get('/:id', (req, res, next) => {

    store.get(req.params.id)
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, e, 400);
    });
    
});




/* PUT REQUEST */
router.put("/addMediaList", (req, res, next) => {
    store.addMediaList(req.body)
    .then(data => {
        response.success(req, res, 'You has added a new media', 200);
    })
    .catch(e => {
        response.error(req, res, e, 400);
    });
})

module.exports = router;