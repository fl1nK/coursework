const PDFFile = require("../models/pdfFileModel");
const User = require("../models/User");
const createPath = require('../helpers/create-path.js')
const path = require("path");
const fs = require('fs')
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const {secret} = require("../config");
const {getValuePdf} = require('../helpers/tools-pdf')

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

            getValuePdf(filename).then(values => {

                const cookies = cookie.parse(req.headers.cookie || '');
                const token = cookies.token.split(' ')[1]
                const {id: userid} = jwt.verify(token, secret)
                const {name} = req.body;

                const pdfFile = new PDFFile({ name, filename, values });
                pdfFile
                    .save()
                    .then((file) => {
                        User
                            .findByIdAndUpdate(userid, {$push:{pdf: file._id}})
                            .then(() => res.redirect('/patterns-by-user'))
                            .catch((error) => console.log(error));
                    })
                    .catch((error) => console.log(error));
            })
        });
        // ------------------------------------------------
}

const getPatterns = (req, res) => {
    User
        .find({ roles: ['ADMIN'] })
        .then((user) => {
            PDFFile
                .find({ _id: user[0].pdf } )
                .then((patterns) => res.render(createPath('views/patterns-by-user.ejs'),{patterns}))
                .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
}

const getPatternsByUserID = (req, res) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token.split(' ')[1]
    const {id: userid} = jwt.verify(token, secret)
    User
        .findById(userid)
        .then((user) => {
            PDFFile
                .find({ _id: user.pdf } )
                .then((patterns) => res.render(createPath('views/patterns-by-user.ejs'),{patterns}))
                .catch((error) => console.log(error));
        })
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

    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token.split(' ')[1]
    const {id: userid} = jwt.verify(token, secret)

    const {fileid} = req.body;

    User
        .findByIdAndUpdate(userid, {$pullAll: {pdf: [{_id: fileid}],},})
        .then()
        .catch((error) => console.log(error));

    PDFFile
        .findByIdAndDelete(fileid)
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