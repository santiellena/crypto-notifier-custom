const store = require('./store');
const controller = require('./controller');

module.exports = controller(store);