const configs = {
    api: { 
        port: process.env.API_PORT || '',
        host: process.env.HOST || '',
    },
    jwt: {
        secret: process.env.JWT_SECRET || ''
    },
    mongodb: {
        uri: process.env.MONGO_URI || '',
    },
    mongoService: {
        host: process.env.MONGO_HOST || '',
        port: process.env.MONGO_PORT || '',
    },
    binance: {
        apiKey: '',
        apiSecret: '',
    },
};

module.exports = configs;