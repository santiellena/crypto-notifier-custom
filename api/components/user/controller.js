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


    return {
        list,
        update,
        get,
    }

}