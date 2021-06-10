const db = require("mongoose")
const configs = require('../config')
const uri = configs.mongodb.uri
const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    authSource: "admin"
};

db.Promise = global.Promise

const connect = () =>{
    db.connect(uri, config)
        .then(() => console.log("[mongodb] Successfully connected"))
        .catch(e => console.log("[mongodb] Connection failed", e))
}

module.exports = connect
