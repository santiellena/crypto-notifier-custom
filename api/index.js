const express = require('express');
const socket = require('./socket');
const config = require('../config');


//Middlewares
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const errors = require('../network/errors');

//Initializations
const app = express();
const server = require('http').Server(app);

//Settings
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/api/user', user);
app.use('/api/auth', auth);

//Errors
app.use(errors);

//Server initialization
server.listen(config.api.port, () => {

    console.log(`API listening... ${config.api.host}:${config.api.port}`);
});