const { createVerificationEmail } = require('../../../auth/verificationEmail');
const store = require('./model');

const list = async () => {

    return await store.find();
};

const get = async (id) => {
    const user = await store.findOne({_id : id});
    return user 
};

const searchEmail = async(email) => {
    const response = await store.findOne({email: email})
    console.log(response);
    return response
}

const searchUsername = async(username) => {
    const response = await store.findOne({username: username})
    console.log(response);
    return response
}


const insert = async (data) => {
    const newUser = new store(data);
    console.log(data);
    const saveUser = await newUser.save();
    if (saveUser) {
        const sendEmail = await createVerificationEmail(data.email, data.secretTokenEmail)
        if (sendEmail) {
            return saveUser
        }
    }else{
        return false
    }
}

const verifyEmail = async(data) => {
    const result = await findByToken(data)
    return await store.findOneAndUpdate({_id: result._id}, {$set: {active: true, secretTokenEmail: ''}})
}



const addMediaList = async(data) => {
    return await store.findOneAndUpdate({_id: data.userId}, {$push: {mediaList: {media: data.media.media, value: data.media.value}}}, {runValidators: true, new: true})
}


const deleteMedia = async(data) => {
    const userId = data.userId
    const mediaId = data.mediaId
    
    return await store.findOneAndUpdate({_id: userId, "mediaList._id": mediaId},{$pull: {mediaList: {_id: mediaId}}}, {runValidators: true, new: true} ) 
}

const updateMedia = async(data) => {
    const userId = data.userId
    const mediaId = data.mediaId
    const value = data.value
    
    return await store.findOneAndUpdate({_id: userId, "mediaList._id": mediaId},{$set: {"mediaList.$.value": value}}, {runValidators: true, new: true} ) 
}

const update = async () => {
    
    return true
};



//FUNCTIONS
const findByToken = async(data) => {
    return await store.findOne({secretTokenEmail: data})
}


module.exports = {
    list,
    get,
    insert,
    update,
    searchEmail, 
    addMediaList,
    deleteMedia,
    updateMedia,
    verifyEmail,
    searchUsername
}