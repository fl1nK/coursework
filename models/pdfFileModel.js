const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdfFileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
})

const PDFFile = mongoose.model('PDFFile', pdfFileSchema);
module.exports = PDFFile;