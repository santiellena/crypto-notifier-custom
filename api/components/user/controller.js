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


    return {
        list,
        update
    }

}