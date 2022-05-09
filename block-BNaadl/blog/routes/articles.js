var express = require('express');
var router = express.Router();
const Article = require('../models/article')
const Comment = require('../models/comment')

// Fetch all articles
router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if(err) return next(err)
    res.render('articles', {articles: articles})
  })
})

// Render new article form
router.get('/new', (req, res) => {
  res.render('addArticle')
})

// Fetch single article details
router.get('/:id', (req, res, next) => {
  let id = req.params.id
  // Article.findById(id, (err, article) => {
  //   if(err) return next(err)
  //   res.render('articleDetails', {article: article})
  // })
  Article
    .findById(id)
    .populate('comments')
    .exec((err, article) => {
      if(err) return next(err)
      console.log(article);
      res.render('articleDetails', {article})
    })
})

// Fetch article details in form to update
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id
  Article.findById(id, (err, article) => {
    article.tags = article.tags.join(' ')
    if(err) return next(err)
    res.render('updateArticle', {article: article})
  })
})

// Update Likes
router.get('/:id/likes', (req, res, next) => {
  let id = req.params.id 
  Article.findByIdAndUpdate(id, {$inc: {likes: 1}}, (err, article) => {
    if(err) return next(err)
    res.redirect('/articles/' + id)
  })
})

// Update article
router.post('/:id', (req, res, next) => {
  let id = req.params.id
  req.body.tags = req.body.tags.split(' ')
  Article.findByIdAndUpdate(id, req.body, (err, updatedArticle) => {
    if(err) return next(err)
    res.redirect('/articles/' + id)
  })
})

// Create new article
router.post('/', (req, res, next) => {
  req.body.tags = req.body.tags.trim().split(' ')
  Article.create(req.body, (err, createdArticle) => {
    if(err) return next(err)
    res.redirect('/articles')
  })
})

// Delete article
router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id
  Article.findByIdAndDelete(id, (err, article) => {
    if(err) return next(err)
    Comment.remove({articleId: article.id}, (err) => {
      if(err) return next(err)
      res.redirect('/articles')
    })
  })
})

// Capture comment data
router.post('/:articleId/comments', (req, res, next) => {
  let articleId = req.params.articleId
  console.log(req.body);
  req.body.articleId = articleId
  Comment.create(req.body, (err, comment) => {
    if(err) return next(err)
    Article.findByIdAndUpdate(articleId, {$push: {comments: comment.id}}, (err, article) => {
      if(err) return next(err)
      res.redirect('/articles/' + articleId)
    })
  })
})

module.exports = router;
