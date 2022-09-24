const Itinerary = require("../models/Itinerary")
const Joi = require('joi')

const validator = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Z0-9ñ ]+$/).min(3).max(50).required().error(new Error('Itinerary name must have between 3 and 50 characters, letters and/or numbers')),
  user: Joi.string().hex().required(),
  city: Joi.string().hex().required(),
  price: Joi.number().integer().min(0).max(2000).required().error(new Error('Itinerary price must be a number between 0 and 2000')),
  likes: Joi.array().unique((a, b) => a.property === b.property),
  tags: Joi.string().required(),
  duration: Joi.number().integer().min(1).max(240).required().error(new Error('Duration must be a number between 1 and 240')),
})

const itineraryController = {
  addItinerary: async (req, res) => {
    try {
      let result = await validator.validateAsync(req.body)
      let itinerary = await new Itinerary(req.body).save()
      res.status("201").json({
        message: "itinerary added successfully.",
        response: itinerary._id,
        success: true,
      })
    } catch (error) {
      console.log(error)
      res.status("400").json({
        message: error.message,
        success: false,
      })
    }
  },
  getItinerary: async (req, res) => {
    const { id } = req.params
    try {
      let itinerary = await Itinerary.findOne({ _id: id })
      if (itinerary) {
        res.status("200").json({
          message: "itinerary found",
          response: itinerary,
          succes: true,
        })
      } else {
        res.status("404").json({
          message: "itinerary not found",
          succes: false,
        })
      }
    } catch (error) {
      console.log(error)
      res.status("400").json({
        message: "error while trying to find an itinerary",
        succes: false,
      })
    }
  },
  getItineraries: async (req, res) => {
    let itineraries
    let query = {}
    if (req.query.city) {
      query.city = req.query.city
    }
    if (req.query.user) {
      query.user = req.query.user
    }
    try {
      itineraries = await Itinerary.find(query)
        .populate("user", { name: 1, lastName: 1, country: 1, photo: 1 })
        .populate("city", { city: 1, country: 1 })
      if (itineraries) {
        res.status("200").json({
          message: "the following itineraries were found",
          response: itineraries,
          success: true,
        })
      } else {
        res.status("404").json({
          message: "no itineraries found",
          success: false,
        })
      }
    } catch (error) {
      console.log(error)
      res.status("400").json({
        message: "error while trying to get all itineraries",
        success: false,
      })
    }
  },
  modifyItinerary: async (req, res) => {
    const { id } = req.params
    let itinerary
    try {
      itinerary = await Itinerary.findOneAndUpdate({ _id: id }, req.body, { new: true })
      if (itinerary) {
        res.status("200").json({
          message: "itinerary updated successfully",
          response: itinerary,
          success: true,
        })
      } else {
        res.status("404").json({
          message: "couldn't update, no such itinerary were found",
          success: false,
        })
      }
    } catch (error) {
      console.log(error)
      res.status("400").json({
        message: "error while trying to update an itinerary",
        success: false,
      })
    }
  },
  removeItinerary: async (req, res) => {
    const { id } = req.params
    let { userId, role } = req.user
    try {
      let itinerary = await Itinerary.findOneAndRemove({ _id: id })
      if (itinerary.user === userId || role === "admin") {
        res.status("200").json({
          message: "itinerary deleted succesfully.",
          success: true,
        })
      } else {
        res.status("401").json({
          message: "unauthorized",
          success: true,
        })
      }
    } catch (error) {
      console.log(error)
      res.status("400").json({
        message: "Error",
        success: false,
      })
    }
  },
  likeDislike: async (req, res) => {
    let { userId } = req.user
    let { id } = req.params
    try {
      let itinerary = await Itinerary.findOne({ _id: id })
      if (itinerary && itinerary.likes.includes(userId)) {

        await Itinerary.findOneAndUpdate({ _id: id }, { $pull: { likes: userId } }, { new: true })
        res.status(200).json({
          success: true,
          message: "you disliked this Itinerary"
        })
      } else {
        await Itinerary.findOneAndUpdate({ _id: id }, { $push: { likes: userId } }, { new: true })
        res.status(200).json({
          success: true,
          message: "you liked this Itinerary"
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({
        success: false,
        message: "error"
      })
    }
  }
}
module.exports = itineraryController
