const PDFFile = require("../models/pdfFileModel");
const createPath = require('../helpers/create-path.js')
const path = require("path");

const addPDF = (req, res) => {

    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.pdfFile;
    const filename = Date.now()+'-'+file.name
    const extensionName = path.extname(filename); // fetch the file extension
    const allowedExtension = ['.pdf'];

    if(!allowedExtension.includes(extensionName)){
        return res.status(422).send("Invalid Image");
    }
    const pathFile = createPath('./public/dataPatternPDF/' + filename )

    file.mv(pathFile, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });

    const {name} = req.body;
    const pdfFile = new PDFFile({ name, filename });
    pdfFile
        .save()
        .then(() => res.redirect('/add-pdf-file'))
        .catch((error) => console.log(error));
}

const getPatterns = (req, res) => {
    PDFFile
        .find()
        .then((patterns) => res.render(createPath('views/patterns.ejs'),{patterns}))
        .catch((error) => console.log(error));
}

const getPattern = (req, res) => {
    PDFFile
        .findById(req.params.id)
        .then((pattern) => res.render(createPath('views/pattern.ejs'),{pattern}))
        .catch((error) => console.log(error));
}

module.exports  ={
    addPDF,
    getPatterns,
    getPattern
}