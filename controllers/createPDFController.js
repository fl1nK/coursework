//const PDFFile = require("../models/pdfFileModel");
const path = require('path');
const createPath = require('../helpers/create-path.js')
const createPdf = require('../helpers/create-pdf')

const createPDF = (req, res) => {
    const {id, namePDFFile} = req.body
    console.log(id)
    console.log(namePDFFile)
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.jsonFile;
    const nameJSONFile = Date.now()+'-'+file.name

    const extensionName = path.extname(nameJSONFile); // fetch the file extension
    const allowedExtension = ['.json'];

    if(!allowedExtension.includes(extensionName)){
        return res.status(422).send("Invalid Image");
    }
    const pathFile = createPath('./public/dataJSON/' + nameJSONFile )

    file.mv(pathFile, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        createPdf(namePDFFile, nameJSONFile)
            .then(() => {
                res.render(createPath('views/downloadPDF.ejs'),{id, namePDFFile})})
    });
}

const downloadPDF = (req, res) => {
    const {namePDFFile} = req.body
    const file = createPath(`./public/endPDF/${namePDFFile}`);
    res.download(file);
}

module.exports  ={
    createPDF,
    downloadPDF
}