const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema({
  title: String,
  description: String,
  tags: [String],
  author: String,
  likes: Number
}, {timestamps: true})

let Article = mongoose.model('Article', articleSchema)
module.exports = Article