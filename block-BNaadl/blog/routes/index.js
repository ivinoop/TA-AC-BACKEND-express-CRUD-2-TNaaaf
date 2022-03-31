var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router;
