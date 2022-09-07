const express = require('express');
const router = express.Router();
const { getUser, createUser } = require('../controllers/UserController' )


router.get('/:id', getUser );
router.post('/', createUser);

module.exports = router;
