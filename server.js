const express = require('express')
const path = require("path");

const app = express()

app.set('view engine', 'ejs')
const PORT = 3000

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)
app.listen(PORT, (error)=>{
    error ? console.log(error) : console.log(`server start port: ${PORT}`)
})

app.use(express.urlencoded({extended: false}))

app.use(express.static('styles'))

app.get('/', (req, res) =>{
    const text = 'TEST TEXT EJS'
    res.render(createPath('index'), {text})
})

app.get('/index2', (req, res) =>{
    const name = req.query['name']
    //const {name} = req.body
    res.render(createPath('index2'), {name})
})

app.use((req, res) =>{
    res
        .status(404)
        .render(createPath('error'))
})