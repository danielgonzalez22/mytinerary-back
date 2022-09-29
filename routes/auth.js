const express = require('express');
let passport = require('../config/passport');
let adminPassport = require('../config/adminPassport');
const router = express.Router();
// const { getUser, createUser, getAllUsers } = require('../controllers/UserController' )
const { getUser, signUp,getUsers,modifyUser,removeUser,verifyMail, signIn, signOut, verifyToken } = require('../controllers/UserController' )

router.post('/signup', signUp);
router.get('/token', passport.authenticate('jwt', {session:false}), verifyToken)
router.post('/signin', signIn);
router.post('/signout', signOut);
router.get('/', getUsers );
router.get('/verify/:code', verifyMail );
router.get('/:id', getUser );
router.put('/', passport.authenticate('jwt', {session:false}),modifyUser );
router.delete('/:id',adminPassport.authenticate('jwt', {session:false}), removeUser );


// router.post('/', createUser);
// router.get('/', getUsers );
// router.get('/:id', getUser );
// router.put('/:id', modifyUser );
// router.delete('/:id', removeUser );

module.exports = router;
