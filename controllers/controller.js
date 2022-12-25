const Post = require("../models/model");
const createPath = require('../helpers/create-path.js')

const home = (req, res) => {
    const text = 'HOME'
    res.render(createPath('./views/index.ejs'), {text})
}

const addPDFFile = (req, res) => {
    res.render(createPath('./views/addPDF.ejs'))
}

const createPDFFile = (req, res) => {
    res.render(createPath('./views/createPDF.ejs'))
}

const addPost = (req, res) => {
    const {text} = req.body
    const post = new Post({text})
    post
        .save()
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'),{titel: 'error'})
        })
}

module.exports  ={
    home,
    addPDFFile,
    createPDFFile,
    addPost
}