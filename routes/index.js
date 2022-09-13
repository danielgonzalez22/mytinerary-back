const { Router } = require('express');
var express = require('express');
var router = express.Router();
const cityRouter = require('./cities')
const userRouter = require('./users')
const itineraryRouter = require('./itnerary')
const commentsRouter = require('./comments')
const activityRouter = require('./activities')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json();
});
router.use('/cities', cityRouter)
router.use('/users', userRouter)
router.use('/itineraries', itineraryRouter)
router.use('/activities', activityRouter)
router.use('/comments', commentsRouter)
module.exports = router;
