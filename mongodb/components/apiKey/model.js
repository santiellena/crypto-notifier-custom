const mongoose = require('mongoose');
const {Schema} = mongoose;

const apiKeySchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    scopes: []
});

module.exports = mongoose.model('apiKey', apiKeySchema);