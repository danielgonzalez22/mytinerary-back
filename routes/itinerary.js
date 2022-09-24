const express = require('express');
const passport = require('../config/passport');
const router= express.Router();

const { addItinerary, getItineraries,getItinerary, modifyItinerary, removeItinerary, likeDislike } = require("../controllers/ItineraryController")
//passport.authenticate('jwt',{ session: false}),
router.post('/', addItinerary)
router.patch('/:id',passport.authenticate('jwt',{ session: false}), modifyItinerary)
router.delete('/:id',passport.authenticate('jwt',{ session: false}), removeItinerary )
router.get('/', getItineraries)
router.get('/:id', getItinerary)
router.patch('/like/:id', passport.authenticate('jwt',{ session: false}), likeDislike)

module.exports = router