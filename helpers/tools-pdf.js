const fs = require("fs");
const {PDFDocument} = require("pdf-lib");
const fontkit = require('@pdf-lib/fontkit');
const path = require('path');
const createPath = require('../helpers/create-path.js')

async function createPdfFile(pdfFile, jsonFile) {

    try {

        const output = `./data/endPDF/${pdfFile}`

        const jsonBytes = fs.readFileSync(createPath(`./data/dataJSON/${jsonFile}`),'utf8');
        const data = JSON.parse(jsonBytes);

        const pdfBytes = fs.readFileSync(createPath(`./data/dataPatternPDF/${pdfFile}`));
        const pdfDoc = await PDFDocument.load(pdfBytes);

        pdfDoc.registerFontkit(fontkit);
        const fontBytes = fs.readFileSync(path.join(__dirname, '../arial.ttf'));
        const customFont = await pdfDoc.embedFont(fontBytes);

        const form = pdfDoc.getForm();
        Object.keys(data).forEach((element) => {
            const field = form.getTextField(element);
            field.setText(data[element]);
            field.updateAppearances(customFont)
        });
        //form.flatten();

        const file = await pdfDoc.save();
        fs.writeFile(output, file, (err) => {
            if(err){
                return err
            }
        });
    }catch (e){
        return e
    }


}

async function getValuePdf(pdfFile) {

    const pdfBytes = fs.readFileSync(createPath(`./data/dataPatternPDF/${pdfFile}`));
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const form = pdfDoc.getForm();

    const fields = form.getFields()
    let arr = []
    fields.forEach(field => {
        arr.push(field.getName())
    })
    return arr
}

function getValueJson(jsonFile) {

    const jsonBytes = fs.readFileSync(createPath(`./data/dataJSON/${jsonFile}`),'utf8');
    const jsonData = JSON.parse(jsonBytes);

    let arr = []
    Object.keys(jsonData).forEach(value => {
        arr.push(value)
    })
    return arr
}


function checkPdf(pdf, json) {

    let size
    if(pdf.length < json.length){
        size = json.length
    }else {
        size = pdf.length
    }

    for (var i = 0; i < size; i++) {
        pdf = pdf.filter(e => e !== json[i]);
    }

    return pdf;
}

function checkJson(pdf, json) {
    let size
    if(pdf.length < json.length){
        size = json.length
    }else {
        size = pdf.length
    }

    for (var i = 0; i < size; i++) {
        json = json.filter(e => e !== pdf[i]);
    }
    return json;
}

function checkExcessive(pdfFile, jsonFile) {
    return getValuePdf(pdfFile).then(pdf =>{
        let json = getValueJson(jsonFile)
        return checkJson(pdf, json)
    })
}

module.exports  ={
    createPdfFile,
    getValuePdf,
    checkExcessive
}