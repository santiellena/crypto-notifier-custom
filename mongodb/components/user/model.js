const mongoose = require('mongoose');
const { Schema } = mongoose;
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
    mediaList: [
        {
            media: { type: String },
            value: { type: String }
        }
    ],
    active: {
        type: Boolean,
        default: false
    },
    secretTokenEmail: {
        type: String
    },

    cryptoList: [
        {
            cryptoId: {type: String, required: true},
            change: {type: Number, required: true},
            price: {type: Number, required: true}
        }
    ],
});

userSchema.plugin(uniqueValidator, { message: "Error, {PATH} already exists" })


module.exports = mongoose.model('user', userSchema);