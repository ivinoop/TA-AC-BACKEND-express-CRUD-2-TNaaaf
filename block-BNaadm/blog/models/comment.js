const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: {type: String, required: true},
  articleId: {type: Schema.Types.ObjectId, required: true, ref: 'Article'},
  likes: {type: Number, default: 0},
  author: String
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)