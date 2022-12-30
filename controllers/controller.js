const createPath = require('../helpers/create-path.js')

const home = (req, res) => {
    const text = 'HOME'
    res.render(createPath('./views/index.ejs'), {text})
}

const createPDFFile = (req, res) => {
    res.render(createPath('./views/createPDF.ejs'))
}

module.exports  ={
    home,
    createPDFFile
}