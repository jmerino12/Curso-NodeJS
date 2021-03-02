const express = require('express')
const app = express()

//Middleware
app.use(express.static('public'))


app.get('/generic', function (req, res) {
    res.sendFile(__dirname + '/public/generic.html')
})

app.get('/elements', function (req, res) {
    res.sendFile(__dirname + '/public/elements.html')
})


app.get('/hola-mundo', function (req, res) {
    res.send('hola mundo en su respectiva ruta')
})

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/404.html')
})

app.listen(8080)