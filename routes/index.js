const { Router } = require('express');
var express = require('express');
var router = express.Router();
const cityRouter = require('./cities')
const authRouter = require('./auth')
const itineraryRouter = require('./itinerary')
const commentsRouter = require('./comments')
const activityRouter = require('./activities')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json();
});
router.use('/cities', cityRouter)
router.use('/auth', authRouter)
router.use('/itinerary', itineraryRouter)
router.use('/comments', commentsRouter)
module.exports = router;
