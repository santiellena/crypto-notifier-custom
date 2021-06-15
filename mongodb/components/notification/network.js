const express = require('express')
const router = express.Router()

const response = require('../../../network/response');
const store = require('./store');


router.get('/:id', (req, res, next) => {
    store.get(req.params.id)
    .then(data => {
        response.success(req, res, data, 200)
    })
    .catch(err => {
         response.error(req,res,err, 400)
    })
})


router.post('/', (req, res, next) => {
    store.insert(req.body)
    .then(data => {
        response.success(req, res, data, 200)
    })
    .catch(err => {
        response.error(req,res,err, 400)
    })
})


router.put("/:id", (req, res, next) => {
    store.read(req.params.id)
     .then(data => {
        response.success(req, res, data, 200)
    })
    .catch(err => {
        response.error(req,res,err, 400)
    })
})

router.delete("/:id", (req, res, next) => {
    store.deleteNotif(req.params.id)
     .then(data => {
        response.success(req, res, data, 200)
    })
    .catch(err => {
        response.error(req,res,err, 400)
    })
})




module.exports = router