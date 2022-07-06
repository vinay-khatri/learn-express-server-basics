const express = require('express')
const path = require('path')

const mongoose = require('mongoose')
const Post = require('./models/posts')

const app = express()

// --------- Database -----------

// for databse we are going to use mongodb atlas (cloud version of mongodb) in this tutorial
// i have also commented how to connect to a mongodb server(local) instead of mongodb atlas.

// -- Mongoose --
// we will use third-party npm package mongoose to communicate with mongodb.
// mongoose uses schema as predefined structure of object that will be added or fetched from db.
// this schema(strucutre) is then encapsulated inside model which attach database methods layer to it.
// in this tut we are creating a seprate models folder from where models will be exported to use here.

// connect to mongo db atlas & start server
const dbURI = 'mongodb+srv://smellyfish:aabb1234@cluster0.koewp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((res) => app.listen(3000, () => console.log('Server Listening on port 3000')))
    .catch(err => console.log(err))

// connect to mongodb server(local)
// make sure mongodb server is running (mongod)
// mongoose.connect('mongodb://localhost/<database name>')
// if database instance doesn't exist mongodb will create it.

app.set('view engine', 'ejs')
app.use(express.static('public'))

// Querry Db
app.get('/posts', (req, res) => {
    Post.find().sort({ createdAt: -1 })
        .then(result => res.render('posts', { posts: result }))
        .catch(err => console.log(err))
})

app.get('/posts/create', (req, res) => {
    res.render('add-post')
})

app.get('/users', (req, res) => {
    res.render('users')
})

app.get('/', (req, res) => {
    res.render('home')
})

app.use((req, res) => {
    res.status(404).sendFile(path.resolve('./pages/404.html'))
})