const path = require('path');
const createPath = require('../helpers/create-path.js')
const {createPdfFile, checkExcessive} = require('../helpers/tools-pdf')
const fs = require("fs");

const handleError = (res, status, error) => {
    res.status(status)
    res.render(createPath('views/error.ejs'), { error: error });
};

const createPDF = (req, res) => {
    const {namePDFFile} = req.body

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
        if (err) return handleError(res,500, err)

        checkExcessive(namePDFFile, nameJSONFile).then(result =>{
            if(result.length) {
                fs.unlink(pathFile, (err) => {
                    if (err) return handleError(res,500,err);
                });
                return handleError(res,404, `У вашому JSON файлі зайві значення ${result.join(', ')}`);
            }

            createPdfFile(namePDFFile, nameJSONFile).then((err) => {
                if (err) {
                    fs.unlink(pathFile, (err) => {
                        if (err) return handleError(res,500,err);
                    });
                    return handleError(res,500,err);
                }

                fs.unlink(pathFile, (err) => {
                    if (err) {return handleError(res,500,err);}
                });

                setTimeout(() => {
                    res.download(createPath(`./data/endPDF/${namePDFFile}`), (err) =>{
                        if (err) {return handleError(res,500,err);}
                        fs.unlink(createPath(`./data/endPDF/${namePDFFile}`),(err) => {
                            if (err) {return handleError(res,500,err);}
                        })
                    })
                }, 2000)

            }).catch((err) => handleError(res,500,err));
        }).catch((err) => handleError(res,500,err));


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