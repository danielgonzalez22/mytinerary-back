var express = require('express');
var router = express.Router();
const {create, readAll, readOne} = require('../controllers/CityController')

router.post('/', create)
router.get('/', readAll)
router.get('/:id', readOne)

module.exports = router