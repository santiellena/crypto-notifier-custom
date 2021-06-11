const express = require('express');

const router = require('./network');
const config = require('../config');

//Initialization
const app = express();

//Settings
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use('/' ,router);

//API initialization
app.listen(config.mongoService.port, () => {

    console.log(`MongoDB Service listening... ${config.mongoService.host}:${config.mongoService.port}`);
});