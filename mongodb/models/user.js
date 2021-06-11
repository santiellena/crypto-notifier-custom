const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    followingList: [{
        type: Object,
    }],
});

module.exports = mongoose.model('user', userSchema);