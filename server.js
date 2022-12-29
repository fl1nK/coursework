const express = require('express')
const mongoose = require('mongoose')

const createPath = require('./helpers/create-path.js')
const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser');

const testRouter = require('./routes/router.js')
const addPDFRouter = require('./routes/addPDFRouter.js')
const createPDFRouter = require('./routes/createPDFRouter.js')
const authRouter = require('./routes/authRouter.js')


const PORT = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')

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
        .render(createPath('views/error.ejs'),{titel : '404'})
})

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://vlad:pass123@cluster0.g8rarqs.mongodb.net/pdfpattern?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        app.listen(PORT, () => console.log(`server start port: ${PORT}`))
    }catch (e) {
        console.log(e)
    }
}

start()