const express = require('express');
let passport = require('../config/passport');
const router = express.Router();
const {addComment, getComments, modifyComment, removeComment} = require('../controllers/CommentController.js')

router.post('/',passport.authenticate('jwt', {session:false}), addComment);
router.get('/', getComments);
router.put('/:id',passport.authenticate('jwt', {session:false}), modifyComment);
router.delete('/:id',passport.authenticate('jwt', {session:false}), removeComment)


module.exports = router;