const express = require('express');
const multer = require('multer');
const createPath = require('../helpers/create-path.js')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/dataJSON');
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.json')
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(json)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(express.json());

uploadRouter.post('/upload' ,upload.single('imageFile'), (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    })

uploadRouter.get('/download', function(req, res){
    const file = createPath('../public/endPDF/output.pdf');
    res.download(file); // Set disposition and send it.
});

module.exports = uploadRouter;