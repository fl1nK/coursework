const express = require('express');
const multer = require('multer')
const PDFFile = require('../models/pdfFileModel.js')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/dataPatternPDF');
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.pdf')
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(pdf)$/)) {
        return cb(new Error('You can upload only pdf files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const addPDFRouter = express.Router();
addPDFRouter.use(express.json());

addPDFRouter.post('/upload-pdf' ,upload.single('pdfFile'), (req, res) => {

    const filename = req.file.filename;
    const {name} = req.body;

    const pdfFile = new PDFFile({ name, filename });
    pdfFile
        .save()
        .then(() => res.redirect('/add-pdf-file'))
        .catch((error) => console.log(error));

})

module.exports = addPDFRouter;