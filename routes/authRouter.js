const express = require('express')

const controller = require('../controllers/authController.js')
const {check} = require("express-validator")
const createPath = require('../helpers/create-path.js')

const authRouter = express.Router();

authRouter.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], controller.registration)

authRouter.post('/login', controller.login)

authRouter.get('/registration', (req, res) => {
    res.render(createPath('./views/registration.ejs'));
})

authRouter.get('/login', (req, res) => {
    res.render(createPath('./views/login.ejs'));
})

authRouter.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.clearCookie('username')
    res.redirect('/patterns')
})
module.exports = authRouter
