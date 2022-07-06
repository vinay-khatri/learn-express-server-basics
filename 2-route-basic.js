const express = require('express')
const path = require('path')

const app = express()

app.listen(3000, () => { console.log('Server started on port 3000') })

// ------- Request Handlers --------

// express provides some methods (request handlers) that executes based on http request type.
// for example get method for GET, post for POST, delete method for DELETE http request, etc.

// ---------- Routes -----------
// request handlers take route path and callback funtion. when path matches callback function is invoked.
// get() method routes http GET requests to the specified path with the specified callback functions.
app.get('/express', (req, res) => {
    // -- send response --
    // instead of res.write() and res.end() method we can use res.send() method of express app
    // It automatically sets some headers like status code, content-type etc based on response body.
    res.send('<h1> Hello Express </h1>')
})

app.get('/', (req, res) => {
    // -- send files as response --
    // with sendFile() method we can send files or pages in response body
    // we have to provide the full path to file or we can use relative path with root option provided.
    // NOTE : use path module to resolve path of the file we are going to send.
    res.sendFile(path.resolve('./pages/index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve('./pages/about.html'))
})

// --- redirects ---
app.get('/about-me', (req, res) => {
    res.redirect('/about')
})

// --- 404 page --- 
// use() runs for any type of http request and regardless of route path
// 404 page must be at end so it runs only when no other route path has been matched
app.use((req, res) => {
    res.status(404).sendFile(path.resolve('./pages/404.html'))
})