const express = require('express')
// Express is a minimalist web server framework built on top of node js.
// It provides a layer of abstraction or simplification above nodejs http stuff.
// It provides simple methods to create a nodejs web server.

// express() is the most top level function exported from express module.
// it contains all the neccassary methods, server constructor etc.
const app = express()

// listen() method of express app creates a server, listens on port specified and returns the server reference.
// server reference is required if we want to use stuff like websockets for real time bi-direction data flow.
const expressServer = app.listen(3000, () => {
    console.log('Listening on Port 3000')
})

// get() method Routes http GET requests to the specified path with the specified callback functions.
app.get('/', (req, res) => {

    // instead of res.write() and res.end() in vanilla node.js server
    // we can use res.send() method of express app
    // It automatically sets some headers like status code, content-type etc based on response body.
    res.send('<h1> Hello Express </h1>')

    // console.log('I am still running')
    // After sending response below code is still executed but you can't set a new response

    // You can return a response to exit the function but it is recommended only incase of errors
    // if (condition not met) return res.send('<h1> only Admin is authorized to view this content </h1>')
    // res.send('<h1> Hello Admin </h1>')
})

