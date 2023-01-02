const express = require('express')
const mongoose = require('mongoose')

const createPath = require('./helpers/create-path.js')
const fileUpload = require("express-fileupload");

const testRouter = require('./routes/router.js')
const addPDFRouter = require('./routes/addPDFRouter.js')
const createPDFRouter = require('./routes/createPDFRouter.js')
const authRouter = require('./routes/authRouter.js')

const app = express()

app.set('view engine', 'ejs')

const PORT = process.env.PORT || 3000
const db = 'mongodb+srv://vlad:pass123@cluster0.g8rarqs.mongodb.net/pdfpattern?retryWrites=true&w=majority'

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.log(error));

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(express.urlencoded({extended: false}))

app.use(express.static('styles'))

app.use(fileUpload(''));

app.use(testRouter)
app.use(addPDFRouter)
app.use(createPDFRouter)
app.use(authRouter)

app.use((req, res) =>{
    res
        .status(404)
        .render(createPath('views/error.ejs'),{error : '404'})
})
