const { Router } = require('express');
var express = require('express');
var router = express.Router();
const { create, getComments } = require('../controllers/CommentController.js')

router.post('/', create);
router.get('/', getComments)
// router.get('/:id', read);

module.exports = router;