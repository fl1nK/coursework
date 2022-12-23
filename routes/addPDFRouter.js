const express = require('express');
const multer = require('multer')
const {addPDF} = require('../controllers/addPDFController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/dataPatternPDF');
    },

    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname)
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

addPDFRouter.post('/upload-pdf' ,upload.single('pdfFile'), addPDF)

module.exports = addPDFRouter;