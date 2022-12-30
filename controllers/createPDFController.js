const path = require('path');
const createPath = require('../helpers/create-path.js')
const createPdfFile = require('../helpers/create-pdf')
const fs = require("fs");

const createPDF = (req, res) => {
    const {id, namePDFFile} = req.body
    console.log(id)
    console.log(namePDFFile)


    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.jsonFile;
    const nameJSONFile = Date.now()+'-'+file.name

    const extensionName = path.extname(nameJSONFile);
    const allowedExtension = ['.json'];

    if(!allowedExtension.includes(extensionName)){
        return res.status(422).send("Invalid File");
    }
    const pathFile = createPath('./public/dataJSON/' + nameJSONFile )

    file.mv(pathFile, (err) => {
        if (err) {return res.status(500).send(err);}
        createPdfFile(namePDFFile, nameJSONFile).then(() => {
            fs.unlink(pathFile, (err) => {
                if (err) throw err;
            });

            setTimeout(() => {
                res.download(createPath(`./public/endPDF/${namePDFFile}`), () =>{
                    fs.unlinkSync(createPath(`./public/endPDF/${namePDFFile}`))
                })
            }, 2000)

        })
    })
 }

const downloadPDF = (req, res) => {
    const {namePDFFile} = req.body
    const file = createPath(`./public/endPDF/${namePDFFile}`);
    res.download(file, () =>{
        fs.unlinkSync(file)
    })
}

module.exports  ={
    createPDF,
    downloadPDF
}