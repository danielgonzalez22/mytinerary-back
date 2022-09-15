var express = require('express');
var router = express.Router();
const {createActivity, getActivity, getActivities, modifyActivity, removeActivity} = require('../controllers/ActivityController')
router.get('/', getActivities)
router.get('/:id', getActivity)
router.post('/', createActivity)
router.patch('/:id', modifyActivity)
router.delete('/:id', removeActivity)
module.exports = router