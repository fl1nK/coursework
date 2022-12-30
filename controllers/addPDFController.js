const PDFFile = require("../models/pdfFileModel");
const createPath = require('../helpers/create-path.js')
const path = require("path");
const fs = require('fs')
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const {secret} = require("../config");

const addPDF = (req, res) => {
    // save file -----------------------------
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.pdfFile;
    const filename = Date.now()+'-'+file.name
    const extensionName = path.extname(filename); // fetch the file extension
    const allowedExtension = ['.pdf'];

    if(!allowedExtension.includes(extensionName)){
        return res.status(422).send("Invalid File");
    }
    const pathFile = createPath('./public/dataPatternPDF/' + filename )

    file.mv(pathFile, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
    // ------------------------------------------------

    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token.split(' ')[1]
    const {id: id, roles: roles} = jwt.verify(token, secret)
    const userid = id
    const role = roles[0]

    const {name} = req.body;
    const pdfFile = new PDFFile({ name, filename, userid, role });
    pdfFile
        .save()
        .then(() => res.redirect('/patterns-by-user'))
        .catch((error) => console.log(error));
}

const getPatterns = (req, res) => {
    PDFFile
        .find({role : 'ADMIN'})
        .then((patterns) => res.render(createPath('views/patterns.ejs'),{patterns}))
        .catch((error) => console.log(error));
}

const getPatternsByUserID = (req, res) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token.split(' ')[1]
    const {id: id} = jwt.verify(token, secret)
    PDFFile
        .find({userid : id})
        .then((patterns) => res.render(createPath('views/patterns-by-user.ejs'),{patterns}))
        .catch((error) => console.log(error));
}

const getPattern = (req, res) => {
    PDFFile
        .findById(req.params.id)
        .then((pattern) => res.render(createPath('views/pattern.ejs'),{pattern}))
        .catch((error) => console.log(error));
}

const getPDF = (req, res) => {
    res.render(createPath('./views/addPDF.ejs'))
}

const deletePDF = (req, res) => {
    const {id} = req.body;
    PDFFile
        .findByIdAndDelete(id)
        .then((params) => {
            const pathFile = createPath('./public/dataPatternPDF/' + params.filename )
            fs.unlink(pathFile, (err) => {
                if (err) throw err;
                res.redirect('/patterns-by-user')
            });
        })
        .catch((error) => console.log(error));
}

module.exports  ={
    addPDF,
    getPDF,
    deletePDF,
    getPatternsByUserID,
    getPatterns,
    getPattern
}