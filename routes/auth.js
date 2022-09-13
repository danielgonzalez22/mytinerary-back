const express = require('express');
const router = express.Router();
// const { getUser, createUser, getAllUsers } = require('../controllers/UserController' )
const {signUp} = require('../controllers/UserController')

router.post('/signup', signUp)


// router.post('/', createUser);
// router.get('/', getUsers );
// router.get('/:id', getUser );
// router.put('/:id', modifyUser );
// router.delete('/:id', removeUser );

module.exports = router;
