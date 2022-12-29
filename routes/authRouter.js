const express = require('express')

const controller = require('../controllers/authController.js')
const {check} = require("express-validator")
const authMiddleware = require('../middlewaree/authMiddleware')
const roleMiddleware = require('../middlewaree/roleMiddleware')
const createPath = require('../helpers/create-path.js')
const cookie = require('cookie');

const authRouter = express.Router();

authRouter.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], controller.registration)
authRouter.post('/login', controller.login)
authRouter.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)

authRouter.get('/registration', (req, res) => {
    res.render(createPath('registration.ejs'));
})

authRouter.get('/login', (req, res) => {
    res.render(createPath('login.ejs'));
})

authRouter.get('/test', (req, res) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    res.send(cookies.token)
})

authRouter.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.send('User Out')
})
module.exports = authRouter
