const express = require('express');
const {createPDF, downloadPDF} = require('../controllers/createPDFController.js')

const createPDFRouter = express.Router();

createPDFRouter.post('/create-pdf', createPDF)
createPDFRouter.post('/download-pdf', downloadPDF)
module.exports = createPDFRouter;