const express = require('express');
const router = express.Router();

const controller = require('./index');
const response = require('../../../network/response');
const secure = require('./secure');

router.get('/', secure('get'), (req, res) => {

    controller.list()
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, e, 400);
    });
});


router.get("/:id", secure('get'), (req,res) => {
    controller.get(req.params.id)
    .then(data => {
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
    return
})


module.exports = router;