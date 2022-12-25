const express = require('express');
const fs = require("fs");
const util = require("util");
const {PDFDocument} = require("pdf-lib");
//const createPath = require('../helpers/create-path.js')
const multer = require("multer");

let data;
fs.readFile("public/dataJSON/data.json", "utf8", (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err);
        return;
    }
    try {
        data = JSON.parse(jsonString);
    } catch (err) {
        console.log("Error parsing JSON string:", err);
    }
});

async function createPdf(input, output) {
    const readFile = util.promisify(fs.readFile);

    function getStuff() {
        return readFile(input);
    }

    const file = await getStuff();
    const pdfDoc = await PDFDocument.load(file);
    const form = pdfDoc.getForm();

    Object.keys(data).forEach((element) => {
        const field = form.getTextField(element);
        field.setText(data[element]);
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFile(output, pdfBytes, () => {
        console.log("PDF created!");
    });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/dataJSON');
    },

    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(json)$/)) {
        return cb(new Error('You can upload only pdf files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});


const createPDFRouter = express.Router();

createPDFRouter.post('/create-pdf', upload.single('jsonFile'), (req, res) => {

    createPdf("./public/dataPatternPDF/input.pdf", "./public/endPDF/output.pdf");
    res.statusCode = 200;
    res.send('Create PDF');

})

module.exports = createPDFRouter;