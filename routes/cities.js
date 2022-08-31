var express = require('express');
var router = express.Router();
const {create, read} = require('../controllers/CityController')

router.post('/', create)

module.exports = router;