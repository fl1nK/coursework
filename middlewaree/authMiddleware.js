const jwt = require('jsonwebtoken')
const {secret} = require('../config')
const cookie = require('cookie');

const createPath = require('../helpers/create-path.js')
const handleError = (res, status, error) => {
    //console.log(error);
    res.status(status)
    res.render(createPath('views/error.ejs'), { error: error });
};

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const cookies = cookie.parse(req.headers.cookie || '');
        const token = cookies.token.split(' ')[1]

        if (!token) {
            return handleError(res,403,'Користувач не авторизований')
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return handleError(res,403,'Користувач не авторизований')
    }
};
