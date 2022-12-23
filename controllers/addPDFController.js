const PDFFile = require("../models/pdfFileModel");

const addPDF = (req, res) => {
    const filename = req.file.filename;
    const {name} = req.body;
    const pdfFile = new PDFFile({ name, filename });
    pdfFile
        .save()
        .then(() => res.redirect('/add-pdf-file'))
        .catch((error) => console.log(error));
}

module.exports  ={
    addPDF
}