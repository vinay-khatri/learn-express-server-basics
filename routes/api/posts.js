const express = require('express')
const Post = require('../../models/posts')

const router = express.Router()

// get all posts
router.get('/', (req, res, next) => {
    Post.find().sort({ createdAt: -1 })
        .then(result => res.send({ posts: result }))
        .catch(err => res.status(422).send({ error: err.message }))
})

// get posts based on url params
// geo coordinates as url params in this tut.
router.get('/', (req, res, next) => {
    Post.geoNear(
        { type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] },
        { maxDistance: 10000, spherical: true }
    ).then(result => res.send({ posts: result }))
        .catch(err => res.status(422).send({ error: err.message }))
})

// add new post
router.post('/create', (req, res, next) => {
    Post.create(req.body)
        .then(result => res.send({ post: req.body }))
        .catch(err => res.status(422).send({ error: err.message }))
})

// get a specific post
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Post.findById(id)
        .then(result => res.send({ post: result }))
        .catch(err => res.status(422).send({ error: err.message }))
})

// update a post
router.put('/:id', (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
        .then(result => Post.findOne(req.params.id))
        .then(result => res.send({ post: result }))
        .catch(err => res.status(422).send({ error: err.message }))
})

// delete a post
router.delete('/:id', (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
        .then(result => res.send({ post: result }))
        .catch(err => res.status(422).send({ error: err.message }))
})


// REST Api sends response in text formats only.
// data can be easily fetched from client side using fetch api

// fetch(`/api/posts`)
//     .then(jsonData => jsonData.json())
//     .then(data => console.log(data))

module.exports = router