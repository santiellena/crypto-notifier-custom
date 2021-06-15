const auth = require('../../../auth/index');

const checkAuth = (action) => {
    let owner;
    const middleware = (req, res, next) => {
        switch(action){
            case 'update':
                owner = req.body.id;
                auth.check.own(req, owner);
                next();
                break;
            case 'get':
                owner = req.body.id;
                auth.check.own(req, owner);
                next(); 
                break;
            default: next();
        };
    };
    return middleware;
};

module.exports = checkAuth;