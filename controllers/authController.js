const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config")
const cookie = require('cookie');
const createPath = require('../helpers/create-path.js')

const handleError = (res, status, error) => {
    console.log(error);
    res.status(status)
    res.render(createPath('views/error.ejs'), { error: error });
};

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return handleError(res,400,'Помилка при реєстрації')
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return handleError(res,400,'Користувач з таким логіном уже існує')
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.redirect('/login')
        } catch (e) {
            console.log(e)
            return handleError(res,400,'Помилка при реєстрації')
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return handleError(res,400,`Користувач ( ${username} ) не знайдено`)
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return handleError(res,400,`Введено невірний пароль`)
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.setHeader('Set-Cookie', cookie.serialize('token', `Bearer ${token}`)).redirect('/patterns')

        } catch (e) {
            console.log(e)
            return handleError(res,400,`Помилка при вході`)
        }
    }

}

module.exports = new authController()
