const express = require('express')
const path = require('path')

const app = express()
app.listen(3000, () => { console.log('Server started on port 3000') })
app.set('view engine', 'ejs')

// --------- Middleware -----------

// any code which runs between getting a request and sending a response is called middleware.

// in express we have use() method to run middleware regardless of request type and route path.
// get() is also a middleware but it runs only for http GET request and provided route path.
// we can also provide route path in use() method but it is optional.
// we can use middleware for logging, checking authentication, parsing json data, 404 page etc.

// logger middleware
app.use((req, res, next) => {
    console.log(`New ${req.method} request made by  ${req.hostname}`)
    // next() method is required to get out of the callback to continue code execution.
    next()
})

// static file middleware
// using express's inbuilt middleware to serve static files like images, styles etc.
// the argument specifies the root directory from which to serve static assets.
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./pages/index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve('./pages/about.html'))
})

app.get('/dummy', (req, res) => {
    const posts = [
        { title: 'Server', content: 'a piece of softwares that can listen for requests/commands of another piece of software' },
        { title: 'Web-Server', content: 'a type of server that can listen http requests' }
    ]
    res.render('dummy', { posts: posts, user: 'vinay' })
})

app.use((req, res) => {
    res.status(404).sendFile(path.resolve('./pages/404.html'))
})