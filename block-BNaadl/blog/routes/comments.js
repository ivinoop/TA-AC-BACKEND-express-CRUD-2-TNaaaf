const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')
const Article = require('../models/article')

// Fetch comment details for Edit Comment
router.get('/:commentId/edit', (req, res, next) => {
  let commentId = req.params.commentId
  Comment.findById(commentId, (err, comment) => {
    if(err) return next(err)
    res.render('editComment', {comment})
  })
})

// Send updated comment to DB via POST
router.post('/:id', (req, res, next) => {
  let id = req.params.id
  Comment.findByIdAndUpdate(id, req.body, (err, updatedComment) => {
    if(err) return next(err)
    res.redirect('/articles/' + updatedComment.articleId)
  })
})

// Delete comment
router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id 
  Comment.findByIdAndDelete(id, (err, deletedComment) => {
    if(err) return next(err)
    Article.findByIdAndUpdate(deletedComment.articleId, {$pull: {comments: deletedComment.id}}, (err, article) => {
      if(err) return next(err)
      res.redirect('/articles/' + deletedComment.articleId)
    })
  })
})

module.exports = router