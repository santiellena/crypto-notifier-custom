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
router.put('/addMedia', secure('update'), (req, res) => {
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


router.put('/deleteMedia', secure('update'), (req, res) => {
    const userId = req.user.userData._id
    const mediaId = req.body.mediaId
    controller.deleteMedia(userId, mediaId)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, e, 400);
        });
})

router.put('/updateMedia', secure('update'), (req, res) => {
    const userId = req.user.userData._id
    const mediaId = req.body.mediaId
    const value = req.body.value
    controller.updateMedia(userId, mediaId, value)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, e, 400);
        });
})


router.put("/addCrypto", secure("update"), (req,res) => {
    const userId = req.body.id
    const change = req.body.change
    const cryptoId = req.body.cryptoId
    const price = req.body.price

    controller.addCrypto(userId, cryptoId, change, price)
    .then(data => {
        if (data.body !== "") {
            return response.success(req, res, data, 200);
        }
        response.success(req, res, "error", 200);
    })
    .catch(e => {
        response.error(req, res, e, 400);
    });

})


module.exports = router;