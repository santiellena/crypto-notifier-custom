const express = require('express');
const config = require('../config');
const db = require('../store/mongodb');

const user = require('./components/user/network');


//Initialization
const app = express();

//Settings
app.use(express.json());
app.use(express.urlencoded({extended: true}));
db();

//Routes
app.use('/user' , user);

//API initialization
app.listen(config.mongoService.port, () => {

    console.log(`MongoDB Service listening... ${config.mongoService.host}:${config.mongoService.port}`);
});