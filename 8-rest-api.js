const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts')
const postAPIs = require('./routes/api/posts')

const app = express()

// using mongodb server (local) instead of mongodb atlas (cloud)
mongoose.connect('mongodb://localhost/first-express-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => app.listen(process.env.PORT || 3000, () => console.log('Server Listening on port 3000')))
    .catch(err => console.log(err))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/posts', postRoutes)

// ----------- REST API -------------

// REST is a software architecture style where server sends response in text formats like json.
// REST is not a standard in itself, but RESTful implementations make use of standards, such as HTTP, URI, JSON, and XML.
// so a rest api sends back a response in text format when an HTTP request is made.
app.use('api/posts', postAPIs)

// api error handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message })
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/users', (req, res) => {
    res.render('users')
})

app.use((req, res) => {
    res.status(404).sendFile(path.resolve('./pages/404.html'))
})