const express = require('express');
const router = express.Router();
const { getUser, createUser, getAllUsers } = require('../controllers/UserController' )


router.get('/', getAllUsers );
router.get('/:id', getUser );
router.post('/auth', createUser);

module.exports = router;
