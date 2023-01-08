const express = require('express');
const {addPDF, getPDF, addFavoritesPDF, getFavoritesPDF, deleteFavotitesPDF, deletePDF, getPatternsByUserID, getPatterns, getPattern} = require('../controllers/pdfController')
const authMiddleware = require('../middlewaree/authMiddleware')
const pdfRouter = express.Router();

pdfRouter.post('/add-pdf-file' , addPDF)
pdfRouter.get('/add-pdf-file', authMiddleware, getPDF)
pdfRouter.post('/delete-pdf', authMiddleware, deletePDF)
pdfRouter.get('/patterns-by-user', authMiddleware, getPatternsByUserID)
pdfRouter.get('/' , getPatterns)
pdfRouter.get('/patterns' , getPatterns)
pdfRouter.get('/patterns/:id' , getPattern)
pdfRouter.post('/add-favorites-pdf', authMiddleware, addFavoritesPDF)
pdfRouter.get('/patterns-favorites', authMiddleware, getFavoritesPDF)
pdfRouter.post('/delete-favorites', authMiddleware, deleteFavotitesPDF)


module.exports = pdfRouter;