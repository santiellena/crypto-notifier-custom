const error = require('../../../utils/error')
const auth = require('../auth/index')

const collection = 'user';

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        
        throw error('No Injected Database', 500);
    }

    const list = async () => {

        return await store.list(collection);
    };

    const get = async (id) => {
        return await store.get(collection, null, `/${id}`)
    }

    const update = async (userId, media) => {
        const userGet = await get(userId)
        if (!userGet) {
            throw error('An error has ocurred', 500)
        }
        const mediasUser = userGet.mediaList
        const checkMedia = mediasUser.find(element => element.media === media.media)
        if (checkMedia) {
            throw error(`You already have this media, ${checkMedia.media}`)
        }

        const toSend = {
            userId: userId,
            media: {
                media: media.media,
                value: media.value
            }
        }
        return await store.addMediaList(collection, toSend, '/addMediaList')
    }


    const deleteMedia = async (userId, mediaId) => {
        const toSend = {
            userId,
            mediaId
        }
        const userGet = await store.deleteMedia(collection, toSend, '/deleteMedia')
        return userGet
    }

    const updateMedia = async(userId, mediaId, value) => {
        const toSend = {
            userId,
            mediaId,
            value
        }
        const userGet = await store.updateMedia(collection, toSend, '/updateMedia')
        return userGet
    }


    return {
        list,
        update,
        get,
        deleteMedia,
        updateMedia
    }

}