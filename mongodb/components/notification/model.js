const mongoose = require("mongoose")
const { Schema } = mongoose

const notificationSchema = new Schema({
    userId: { type: String, required: true },
    payload: { type: String, required: true },
    readed: { type: Boolean, default: false },
    time: { type: Number, required: true },
})

module.exports = mongoose.model('notification', notificationSchema)
