exports.success = (req, res, message, status) => {
    let statusCode = status || 200;
    let statusMessage = message || '';

    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: statusMessage,
    });
};

let statusDbMessage

exports.error = (req, res, message, status, dbMessage) => {

    let statusCode = status || 500;
    let statusMessage = message || 'Internal Server Error';
    if (dbMessage) {
        statusDbMessage = dbMessage
    }
    console.log(message);
    res.status(statusCode).send({
        error: true,
        status: statusCode,
        body: statusMessage,
        messageError: statusDbMessage
    });
    setTimeout(() => {
        statusDbMessage = ''
    }, 100)
};