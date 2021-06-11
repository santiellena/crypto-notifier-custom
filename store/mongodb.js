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

let connection;

//Esta funcion crea la conexion a la BD y la misma se ejecuta luego.
const connect = () =>{
    connection = db.connect(uri, config)
        .then(() => console.log("[mongodb] Successfully connected"))
        .catch(e => {

            console.error("[mongodb] Connection failed", e);
            setTimeout(connect, 2000);
        });
}

module.exports = connect;