const mongoose = require('mongoose');
const {Schema} = mongoose;
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    followingList: [{
        type: Object,
    }],
});

userSchema.plugin(uniqueValidator, {message: "Error, {PATH} already exists"})
userSchema.methods.toJSON = function (){
    var obj = this.toObject();
    delete obj.password
    return obj
}

module.exports = mongoose.model('user', userSchema);