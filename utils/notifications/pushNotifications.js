const {Expo} = require('expo-server-sdk')

const expo = new Expo()


function sendNotif(recipients){
    let messages = []
    for(let pushToken of recipients){
        //We check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(pushToken.token)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }

        messages.push({
            to: pushToken.token,
            sound: 'default',
            body: pushToken.message
        })
    }

    let chunks = expo.chunkPushNotifications(messages)
    let tickets = []
    (async () => {
        for(let chunk of chunks){
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk)
                console.log(ticketChunk);
                tickets.push(...ticketChunk)
            } catch (error) {
                console.log(error);
            }
        }
    })()


    let receiptIds = []
    for(let ticket of tickets){
        if (ticket.id) {
            receiptIds.push(ticket.id)
        }
    }

    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds)
    (async() => {
        for(let chunk of receiptIdChunks){
            try {
                let receipts = await expo.getPushNotificationReceiptsAsync(chunk)
                console.log(receipts)

                for (let receiptId in receipts) {
                    let { status, message, details } = receipts[receiptId];
                    if (status === 'ok') {
                        continue;
                    } else if (status === 'error') {
                        console.error(
                            `There was an error sending a notification: ${message}`
                        );
                        if (details && details.error) {
                            // The error codes are listed in the Expo documentation:
                            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                            // You must handle the errors appropriately.
                            console.error(`The error code is ${details.error}`);
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    })()
}

module.exports = sendNotif