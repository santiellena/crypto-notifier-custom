const error = (message, code) => {
    let err = new Error(message);

    if(code){
        err.statusCode = code
    }
    err.data = message   
    return err;
}

module.exports = error;