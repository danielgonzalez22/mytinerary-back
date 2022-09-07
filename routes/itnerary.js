const express = require('express');
const router= express.Router();

const { addItinerary, getItineraries, modifyItinerary, removeItinerary } = require("../controllers/ItineraryController")

router.post('/', addItinerary)
router.patch('/:id', modifyItinerary)
router.delete('/:id', removeItinerary )
router.get('/', getItineraries)

module.exports = router