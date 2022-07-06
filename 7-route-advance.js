const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts')

const app = express()
const dbURI = 'mongodb+srv://smellyfish:aabb1234@cluster0.koewp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((res) => app.listen(3000, () => console.log('Server Listening on port 3000')))
    .catch(err => console.log(err))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// route
// group request handlers in seprate files based on route paths.

// ------------- Modular ---------------

// mvc
// we can also use mvc (model, view, controller) structure.
// we have already implemented model and views.
// in 'controller' we have the callback functions that are fired upon receiving a request..
// these techniques makes our code moduler and easy to manage and debug.

// online-posts routes are grouped together inside routes folder
app.use('/posts', postRoutes)

app.get('/users', (req, res) => {
    res.render('users')
})

app.get('/', (req, res) => {
    res.render('home')
})

app.use((req, res) => {
    res.status(404).sendFile(path.resolve('./pages/404.html'))
})