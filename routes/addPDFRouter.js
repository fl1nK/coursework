const express = require('express');
const {addPDF, getPDF, deletePDF, getPatternsByUserID, getPatterns, getPattern} = require('../controllers/addPDFController')
const authMiddleware = require('../middlewaree/authMiddleware')
const addPDFRouter = express.Router();

addPDFRouter.post('/add-pdf-file' , addPDF)
addPDFRouter.get('/add-pdf-file', authMiddleware, getPDF)
addPDFRouter.post('/delete-pdf', authMiddleware, deletePDF)
addPDFRouter.get('/patterns-by-user', authMiddleware, getPatternsByUserID)
addPDFRouter.get('/patterns' , getPatterns)
addPDFRouter.get('/patterns/:id' , getPattern)

module.exports = addPDFRouter;