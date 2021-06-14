const store = require('./model');

const list = async () => {

    return await store.find();
};

const get = async (id) => {

    return await store.find({_id : id});
};

const searchEmail = async(email) => {
    return await store.findOne({email: email})
}


const insert = async (data) => {
    const newUser = new store(data);

    return await newUser.save();
}

const update = async () => {

    return true
};
module.exports = {
    list,
    get,
    insert,
    update,
    searchEmail
}