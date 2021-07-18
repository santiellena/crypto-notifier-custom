const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const controller = require('./index');
const response = require('../../../network/response');
const makeid = require('../../../utils/makeid');

router.post('/register', (req, res) => {
    console.log(req.body);
    const { username, fullName, email, password } = req.body
    const secretTokenEmail = makeid(10)

    const toCreate = {
        username,
        fullName,
        email,
        password: bcrypt.hashSync(password, 10),
        secretTokenEmail
    }
    controller.insert(toCreate)
        .then(data => {
            console.log(data);
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, err, 400);
        });

});

router.post("/findByEmail", (req, res) => {
    const { email } = req.body
    
    controller.findEmail( email)
    .then(data => {
        if (data) {
            response.success(req, res, {state: true}, 200);
        }
        else{
            response.success(req, res, {status: false}, 200);
        }
        return
    })
    .catch(err => {
        response.error(req, res, err, 400);
        return
    })

})


router.put("/verifyemail", (req, res) => {
    console.log('url', req.body);
    const { secretToken } = req.body
    controller.verify({ secretToken: secretToken })
        .then(data => {
            response.success(req, res, data, 200)
        })
        .catch(err => {
            response.error(req, res, err, 400)
        })

})

router.post("/login", (req, res) => {
    const { email, password, apiKeyToken } = req.body


    controller.login(email, password, apiKeyToken)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {

            response.error(req, res, err, 400);
        });
});


module.exports = router;