const express = require('express')
const mongoose = require('mongoose')

const createPath = require('./helpers/create-path.js')

const testRouter = require('./routes/router.js')
const uploadRouter = require('./routes/uploadRouter.js')
const createRouter = require('./routes/createRouter.js')
const addPDFRouter = require('./routes/addPDFRouter.js')
const createPDFRouter = require('./routes/createPDFFile.js')

const PORT = 3000
const db = 'mongodb+srv://vlad:pass123@cluster0.g8rarqs.mongodb.net/pdfpattern?retryWrites=true&w=majority'

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.log(error))

const app = express()
app.set('view engine', 'ejs')
app.listen(PORT, (error)=>{
    error ? console.log(error) : console.log(`server start port: ${PORT}`)
})

app.use(express.urlencoded({extended: false}))
app.use(express.static('styles'))

app.use(testRouter)
app.use(uploadRouter)
app.use(createRouter)
app.use(addPDFRouter)
app.use(createPDFRouter)

app.use((req, res) =>{
    res
        .status(404)
        .render(createPath('views/error.ejs'),{titel : '404'})
})