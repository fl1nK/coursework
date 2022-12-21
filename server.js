const express = require('express')
const path = require("path");

const app = express()

app.set('view engine', 'ejs')
const PORT = 3000

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)
app.listen(PORT, (error)=>{
    error ? console.log(error) : console.log(`server start port: ${PORT}`)
})

app.get('/', (reqs, res) =>{
    const text = 'TEST TEXT EJS'
    res.render(createPath('index'), {text})
})

app.get('/index2', (reqs, res) =>{
    res.render(createPath('index2'))
})

app.use((req, res) =>{
    res
        .status(404)
        .render(createPath('error'))
})