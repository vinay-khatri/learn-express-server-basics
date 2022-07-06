const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GeoSchema = new Schema({
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" },
})

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    geometry: GeoSchema,
}, { timestamps: true })

// mongoose.model() takes first arg and search for its plural as a collection name inside db.
const Post = mongoose.model('Post', PostSchema)
module.exports = Post