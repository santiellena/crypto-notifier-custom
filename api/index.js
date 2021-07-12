const express = require('express');
const socket = require('./socket');
const config = require('../config');
const cors = require('cors');
const path = require('path');

//Middlewares
const routes = require('./network/routes');
const error = require('../utils/error');

//Initializations
const app = express();
const server = require('http').Server(app);
socket.connect(server);

//Middlewares settings
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(path.resolve(__dirname, config.api.public.route)));

//Routes
routes(app);

//Errors middleware
app.use(error.wrapErrors);
app.use(error.errors);

//Server initialization
server.listen(config.api.port, () => {

    console.log(`API listening... ${config.api.host}:${config.api.port}`);
});