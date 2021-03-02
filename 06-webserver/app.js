const express = require('express')
const app = express()
const hbs = require('hbs');
require('dotenv')

const port = process.env.PORT

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs')


//Middleware
app.use(express.static('public'))

app.get('/', function (req, res) {
    res.render('home', {
        nombre: "Jonathan Meriño",
        titulo: "Curso node"
    });
})


app.get('/generic', function (req, res) {
    res.render('generic', {
        nombre: "Jonathan Meriño",
        titulo: "Curso node"
    });
})

app.get('/elements', function (req, res) {
    res.render('elements', {
        nombre: "Jonathan Meriño",
        titulo: "Curso node"
    });
})


app.get('/hola-mundo', function (req, res) {
    res.send('hola mundo en su respectiva ruta')
})

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/404.html')
})

app.listen(port, () => {
    console.log('Example port ', port)
})