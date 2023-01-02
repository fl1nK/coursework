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

        const file = await pdfDoc.save();
        fs.writeFile(output, file, () => {
            console.log("PDF created!");
        });
    }catch (e){
        console.log(e)
    }


}

async function getValuePdf(pdfFile) {

    const pdfBytes = fs.readFileSync(createPath(`./data/dataPatternPDF/${pdfFile}`));
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const form = pdfDoc.getForm();

    const fields = form.getFields()
    let values = ''
    fields.forEach(field => {
        values = field.getName() +', ' + values
    })

    return values
}

module.exports  ={
    createPdfFile,
    getValuePdf
}