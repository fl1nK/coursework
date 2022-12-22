const express = require('express')
const router = express.Router()

const {home, addPost} = require('../controllers/controller.js')


router.get('/', home)

// router.get('/index2', (req, res) =>{
//     const name = req.query['name']
//     res.render(createPath('index2'), {name})
// })

router.post('/add-post', addPost)

module.exports = router