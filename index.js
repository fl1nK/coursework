const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const util = require("util");
let data;

fs.readFile("./data.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    data = JSON.parse(jsonString);
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});

async function createPdf(input, output) {
  const readFile = util.promisify(fs.readFile);

  function getStuff() {
    return readFile(input);
  }

  const file = await getStuff();
  const pdfDoc = await PDFDocument.load(file);
  const form = pdfDoc.getForm();

  Object.keys(data).forEach((element) => {
    const field = form.getTextField(element);
    field.setText(data[element]);
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFile(output, pdfBytes, () => {
    console.log("PDF created!");
  });
}
createPdf("input.pdf", "output.pdf");
