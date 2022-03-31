var express = require('express');
var router = express.Router();
const Article = require('../models/article')

router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if(err) return next(err)
    res.render('articles', {articles: articles})
  })
})

router.get('/new', (req, res) => {
  res.render('addArticle')
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Article.findById(id, (err, article) => {
    if(err) return next(err)
    res.render('articleDetails', {article: article})
  })
})

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id
  Article.findById(id, (err, article) => {
    if(err) return next(err)
    res.render('updateArticle', {article: article})
  })
})

router.post('/:id', (req, res) => {
  let id = req.params.id
  Article.findByIdAndUpdate(id, req.body, (err, updatedArticle) => {
    if(err) return next(err)
    res.redirect('/articles/' + id)
  })
})

router.post('/', (req, res, next) => {
  Article.create(req.body, (err, createdArticle) => {
    if(err) return next(err)
    res.redirect('/articles')
  })
})

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id
  Article.findByIdAndDelete(id, (err, article) => {
    if(err) return next(err)
    res.redirect('/articles')
  })
})

module.exports = router;
