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
        
        response.error(req, res, e, 400, e);
    });
});


/* GET REQUEST */

//find email
router.get('/searchEmail', (req, res) => {
    store.searchEmail(req.query.email)
    .then(data => {
        if (data) {
            return response.success(req, res, data, 200);
        }else{
            return response.success(req, res, data, 200);
        }
    })
    .catch(e => {
        response.error(req, res, e, 400);
    });
})

router.get('/searchusername', (req,res) => {
    store.searchUsername(req.query.username)
    .then(data => {
        if (data) {
            return response.success(req, res, data, 200);
        }else{
            return response.success(req, res, data, 200);
        }
    })
    .catch(e => {
        response.error(req, res, e, 400);
    });
})

//get user
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

//Verify email
router.put("/verifyemail", (req,res,next) => {
    store.verifyEmail(req.body.secretToken)
    .then(data => {
        console.log(data);
        response.success(req, res, 'You has verified your email', 200);
    })
    .catch(e => {

        response.error(req, res, e, 400);
    });
})


//ADD MEDIA
router.put("/addMediaList", (req, res, next) => {
    store.addMediaList(req.body)
    .then(data => {
        response.success(req, res, 'You has added a new media', 200);
    })
    .catch(e => {
        response.error(req, res, e, 400);
    });
})

//DELETE MEDIA
router.put('/deleteMedia', (req,res,next) => {
    store.deleteMedia(req.body)
    .then(data => {
        response.success(req, res, 'You has deleted the media', 200)
    })
    .catch(e => {
        response.error(req, res, e, 400);
    })
})

//UPDATE MEDIA
router.put("/updateMedia", (req,res,next) => {
    store.updateMedia(req.body)
    .then(data => {
        response.success(req, res, 'You has updated the media', 200)
    })
    .catch(e => {
        response.error(req, res, e, 400);
    })
})



module.exports = router;