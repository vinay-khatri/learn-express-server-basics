const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Post = require('./models/posts')

const app = express()

const dbURI = 'mongodb+srv://smellyfish:aabb1234@cluster0.koewp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((res) => app.listen(3000, () => console.log('Server Listening on port 3000')))
    .catch(err => console.log(err))

// middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))

// Body Parser Middleware
// Parse incoming request bodies before your handlers, available under the req.body property.
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/users', (req, res) => {
    res.render('users')
})

// querry db for posts
app.get('/posts', (req, res) => {
    Post.find().sort({ createdAt: -1 })
        .then(result => res.render('posts', { posts: result }))
        .catch(err => console.log(err))
})

// render post form
app.get('/posts/create', (req, res) => {
    res.render('add-post')
})

// --------- POST request ----------

app.post('/posts/create', (req, res) => {
    // req.body contains all the form input value
    // as Post and req.body object have same keys we can use destructuring and pass req.body directly.
    const post = new Post(req.body)
    post.save()
        .then(result => {
            // sending redirect response to client direct from server.
            res.redirect('/posts')
        })
        .catch(err => console.log(err))
    // instead of post.save(new Post(req.body)) we could use Post.create(req.body)
})

// route parameters
app.get('/posts/:id', (req, res) => {
    const id = req.params.id
    Post.findById(id)
        .then(result => {
            res.render('details', { post: result })
        })
        .catch(err => res.status(404).sendFile(path.resolve('./pages/404.html')))
})

// ---------- DELETE request ----------

// check details template inside views to see how delete request is sent from client.
app.delete('/posts/:id', (req, res) => {
    const id = req.params.id
    Post.findByIdAndDelete(id)
        .then(result => {
            // NOTE : This is a json reponse we are sending to client.
            // as delete request is sent as ajax we can send only a json or text response.
            // we can't redirect client from server like we did in POST request
            // redirection code will executed on client side though url can be sent from server.
            res.json({ redirect: '/posts' })
        })
        .catch(err => console.log(err))
})

app.use((req, res) => {
    res.status(404).sendFile(path.resolve('./pages/404.html'))
})