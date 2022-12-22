const express = require('express')
const mongoose = require('mongoose')
const testRouter = require('./routes/router.js')
const app = express()
const createPath = require('./helpers/create-path.js')

app.set('view engine', 'ejs')

const PORT = 3000
const db = 'mongodb+srv://vlad:pass123@cluster0.g8rarqs.mongodb.net/pdfpattern?retryWrites=true&w=majority'

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.log(error))

app.listen(PORT, (error)=>{
    error ? console.log(error) : console.log(`server start port: ${PORT}`)
})

app.use(express.urlencoded({extended: false}))

app.use(express.static('styles'))

app.use(testRouter)

app.use((req, res) =>{
    res
        .status(404)
        .render(createPath('error'))
})