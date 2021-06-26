const express = require('express');
const socket = require('./socket');
const config = require('../config');
const cors = require('cors')
const db = require('../mongodb/index')


//Middlewares
const routes = require('./network/routes');
const error = require('../utils/error');

//Initializations
const app = express();
app.use(cors())
const server = require('http').Server(app);

//Settings
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
routes(app);

//Errors middleware
app.use(error.wrapErrors);
app.use(error.errors);

//Server initialization
server.listen(config.api.port, () => {

    console.log(`API listening... ${config.api.host}:${config.api.port}`);
});