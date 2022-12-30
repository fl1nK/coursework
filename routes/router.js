const express = require('express')
const router = express.Router()

const {home, createPDFFile} = require('../controllers/controller.js')
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const {secret} = require("../config");


router.get('/', home)
router.get('/create-pdf-file', createPDFFile)

router.get('/test', (req, res) =>{
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token.split(' ')[1]
    const {id: userID, roles: userRoles} = jwt.verify(token, secret)
    console.log(userID.toString())
    console.log(userRoles[0].toString())

    res.send(userID)

})

module.exports = router