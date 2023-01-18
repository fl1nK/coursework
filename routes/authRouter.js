const express = require('express')

const controller = require('../controllers/authController.js')
const {check} = require("express-validator")
const createPath = require('../helpers/create-path.js')

const authRouter = express.Router();

authRouter.post('/registration', [
    check('username', "Логін повинен бути більше 1 і меньше 10 символів").isLength({min:1, max:10}),
    check('password', "Пароль повинен бути більше 4 і меньше 10 символів").isLength({min:4, max:10})
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

authRouter.get('/delete-user',  controller.delete)

module.exports = authRouter
