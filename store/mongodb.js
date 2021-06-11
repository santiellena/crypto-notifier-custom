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

connect();

let Store;

const list = async (collection) => {

    Store = require(`../mongodb/models/${collection}`);
    return await Store.find();
};

const get = (collection, id) => {

    Store = require(`../mongodb/models/${collection}`);
    
    return Store.find({_id : id});
}

const insert = (collection, data) => {

    Store = require(`../mongodb/models/${collection}`);

    const newData = new Store({data});

    newData.save();

    return newData;
    
};

const update = (collection, id, data) => {


}

module.exports = {
    list,
    get,
    insert,
    update,
}



