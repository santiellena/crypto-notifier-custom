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


router.get('/:id', secure('get'), (req, res) => {
    controller.get(req.params.id)
    .then(data => {
        delete data.password
        console.log(data);
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, e, 400);
    });
})



//PUT request - add media to user
router.put('/addMedia', secure('update'), (req,res) => {
    const userId = req.user.userData._id
    const media = {
        media: req.body.media,
        value: req.body.value
    }

    controller.update(userId, media)
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, e, 400);
    });
})


module.exports = router;