const boom = require('@hapi/boom');
const auth = require('../auth/index');

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        
        throw boom.internal('No injected database');
    }

    const list = async () => {

        return await store.list();
    };

    const get = async (id) => {

        return await store.get(id);
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
        return await store.addMediaList(toSend)
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