const express = require('express')
const path = require('path')
const Post = require('../models/posts')

const router = express.Router()

router.get('/', (req, res) => {
    Post.find().sort({ createdAt: -1 })
        .then(result => res.render('posts', { posts: result }))
        .catch(err => console.log(err))
})

router.get('/create', (req, res) => {
    res.render('add-post')
})

router.post('/create', (req, res) => {
    const post = new Post(req.body)
    post.save()
        .then(result => {
            res.redirect('/posts')
        })
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Post.findById(id)
        .then(result => {
            res.render('details', { post: result })
        })
        .catch(err => res.status(404).sendFile(path.resolve('./pages/404.html')))
})


router.delete('/:id', (req, res) => {
    const id = req.params.id
    Post.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/posts' })
        })
        .catch(err => console.log(err))
})

module.exports = router