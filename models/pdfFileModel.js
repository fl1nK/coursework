const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdfFile = new Schema({
    name: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    values: [{
        type: String,
        required: true,
    }]
})

const PDFFile = mongoose.model('PDFFile', pdfFile);
module.exports = PDFFile;