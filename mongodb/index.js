const express = require('express');
const config = require('../config');
const db = require('../store/mongodb');
const cors = require('cors');

const user = require('./components/user/network');
const notification = require('./components/notification/network');
const apiKey = require('./components/apiKey/network');

//Initialization
const app = express();

//Settings
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
db();

//Routes
app.use('/user', user);
app.use('/notification', notification)
app.use('/api-key', apiKey);


//API initialization
app.listen(config.mongoService.port, () => {

    console.log(`MongoDB Service listening... ${config.mongoService.host}:${config.mongoService.port}`);
});