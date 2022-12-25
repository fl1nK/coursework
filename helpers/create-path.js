const path = require("path");

const createPath = (page) => path.resolve(__dirname,`../${page}`)

module.exports = createPath