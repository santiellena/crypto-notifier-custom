const store = require('./model');

const list = async () => {

    return await store.find();
};

const get = async (id) => {
    let data = await store.findOne({_id : id});
    
    return data
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