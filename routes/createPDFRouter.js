const express = require('express');
const {createPDF} = require('../controllers/createPDFController.js')

const createPDFRouter = express.Router();

createPDFRouter.post('/create-pdf', createPDF)
module.exports = createPDFRouter;