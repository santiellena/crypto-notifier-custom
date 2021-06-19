const store = require("./model")

const get = async (userId) => {
    return await store.find({_id: userId})
}

const insert = async (data) => {
    const newNotif = new store(data)

    return await newNotif.save()
}


const read = async (notifId) => {
    const readNotif = await store.findOneAndUpdate({_id: notifId}, {readed: true}, {new: true, runValidators: true})
    return readNotif
}

const deleteNotif = async (notifId) => {
    return await store.findOneAndDelete({_id: notifId})
}


module.exports = {
    get,
    insert,
    read,
    deleteNotif
}