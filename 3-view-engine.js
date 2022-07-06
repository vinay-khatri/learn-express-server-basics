const express = require('express')
const path = require('path')

const app = express()
app.listen(3000, () => { console.log('Server started on port 3000') })

// ---------- View Engines ----------
// view engines or template engines are used to write and render templates.
// template is a file where you can write js along with html code.
// at runtime, variable of these templates will be converted to static html and rendered to client.

// frequently used components like navbar or footer can be created as partials and included in templates
// so same components don't get written again and again in each template.

// by default express uses jade view engine but you can install your own with npm.
// each view engine has its own syntax to create templates files.
// in this app we are going to install and use ejs view engine as its syntax is very easy to use.

// set view engine first so express knows which to use.
// set(name, value) method is used to assign value to a name(any string) in express app.
// some names are reserved for settings of express app. So assigning value to these will change settings table.
app.set('view engine', 'ejs')
// by default views template directory is set to views folder in your root project directory. But you can change it
// app.set('views', 'My-Views-Folder')

// -- rendering --
// so we can say view engines are used for server side rendering.
// but we can use hybrid-rendering, sending dynamic pages as pre-rendered while others as static.

app.get('/dummy', (req, res) => {
    const posts = [
        { title: 'Server', content: 'a piece of softwares that can listen for requests/commands of another piece of software' },
        { title: 'Web-Server', content: 'a type of server that can listen http requests' }
    ]
    // res.render() method to render templates
    // we can't use res.send() method for templates.
    res.render('dummy', { posts: posts, user: 'vinay' })
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./pages/index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve('./pages/about.html'))
})

app.use((req, res) => {
    res.status(404).sendFile(path.resolve('./pages/404.html'))
})