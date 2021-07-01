const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const controller = require('./index');
const response = require('../../../network/response');

router.post('/register', (req, res) => {
    const {username, fullName, email, password}  = req.body

    const toCreate = {
        username,
        fullName,
        email,
        password: bcrypt.hashSync(password, 10),
    }
    controller.insert(toCreate)
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(err => {
        response.error(req, res, err, 400);
    });
    
});

router.post("/login", (req, res) => {
    const {email, password, apiKeyToken} = req.body

    controller.login(email, password, apiKeyToken)
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(err => {
        
        response.error(req, res, err, 400);
    });
});


module.exports = router;