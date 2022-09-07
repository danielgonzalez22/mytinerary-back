const { Router } = require('express');
var express = require('express');
var router = express.Router();
const cityRouter = require('./cities')
const userRouter = require('./users')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json();
});

router.use('/cities', cityRouter)
router.use('/users', userRouter)
module.exports = router;
