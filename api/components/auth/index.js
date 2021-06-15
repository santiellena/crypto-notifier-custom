const store = require('../../../store/remote-mongodb');
const controller = require('./controller');

module.exports = controller(store);