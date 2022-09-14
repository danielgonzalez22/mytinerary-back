const express = require('express');
const router = express.Router();
// const { getUser, createUser, getAllUsers } = require('../controllers/UserController' )
const { getUser, signUp,getUsers,modifyUser,removeUser,verifyMail, signIn } = require('../controllers/UserController' )

router.post('/signup', signUp);
router.post('/signin', signIn)
router.get('/', getUsers );
router.get('/verify/:code', verifyMail );
router.get('/:id', getUser );
router.put('/:id', modifyUser );
router.delete('/:id', removeUser );


// router.post('/', createUser);
// router.get('/', getUsers );
// router.get('/:id', getUser );
// router.put('/:id', modifyUser );
// router.delete('/:id', removeUser );

module.exports = router;
