const express = require('express')
const router = express.Router()

const {home, addPDFFile, createPDFFile, addPost} = require('../controllers/controller.js')


router.get('/', home)
router.get('/add-pdf-file', addPDFFile)
router.get('/create-pdf-file', createPDFFile)
// router.get('/index2', (req, res) =>{
//     const name = req.query['name']
//     res.render(createPath('index2'), {name})
// })

router.post('/add-post', addPost)

module.exports = router