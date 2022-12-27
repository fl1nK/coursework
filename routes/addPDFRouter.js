const express = require('express');
const {addPDF, getPatterns, getPattern} = require('../controllers/addPDFController')

const addPDFRouter = express.Router();

addPDFRouter.post('/upload-pdf' , addPDF)
addPDFRouter.get('/patterns' , getPatterns)
addPDFRouter.get('/patterns/:id' , getPattern)

module.exports = addPDFRouter;