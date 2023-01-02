const path = require('path');
const createPath = require('../helpers/create-path.js')
const {createPdfFile} = require('../helpers/tools-pdf')
const fs = require("fs");

const handleError = (res, status, error) => {
    console.log(error);
    res.status(status)
    res.render(createPath('views/error.ejs'), { error: error });
};

const createPDF = (req, res) => {
    const {id, namePDFFile} = req.body
    console.log(id)
    console.log(namePDFFile)


    if (!req.files) {
        return handleError(res,400,'Файл не завантажено')
    }

    const file = req.files.jsonFile;
    const nameJSONFile = Date.now()+'-'+file.name

    const extensionName = path.extname(nameJSONFile);
    const allowedExtension = ['.json'];

    if(!allowedExtension.includes(extensionName)){
        return handleError(res,422,'Завантаженно некоректний файл')
    }
    const pathFile = createPath('./data/dataJSON/' + nameJSONFile )

    file.mv(pathFile, (err) => {
        if (err) {return res.status(500).send(err);}
        createPdfFile(namePDFFile, nameJSONFile).then(() => {
            fs.unlink(pathFile, (err) => {
                if (err) throw err;
            });

            setTimeout(() => {
                if (err) {return res.status(500).send(err);}

                res.download(createPath(`./data/endPDF/${namePDFFile}`), () =>{
                    fs.unlinkSync(createPath(`./data/endPDF/${namePDFFile}`))
                })
            }, 2000)

        }).catch((error) => console.log(error));
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