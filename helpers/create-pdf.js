const fs = require("fs");
const {PDFDocument} = require("pdf-lib");
const fontkit = require('@pdf-lib/fontkit');
const path = require('path');
const createPath = require('../helpers/create-path.js')

async function createPdf(pdfFile, jsonFile) {
    const output = `./public/endPDF/${pdfFile}`

    const jsonBytes = fs.readFileSync(createPath(`./public/dataJSON/${jsonFile}`),'utf8');
    const data = JSON.parse(jsonBytes);

    const pdfBytes = fs.readFileSync(createPath(`./public/dataPatternPDF/${pdfFile}`));
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
}

module.exports = createPdf