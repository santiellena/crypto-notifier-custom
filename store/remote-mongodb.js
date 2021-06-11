const remote = require('./remote');
const config = require('../config');

module.exports = new remote(config.mongoService.host, config.mongoService.port);