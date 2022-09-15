const Itinerary = require("../models/Itinerary")

const itineraryController = {
  addItinerary: async (req, res) => {
    try {
      let itinerary = await new Itinerary(req.body).save()
      res.status("201").json({
        message: "itinerary added successfully.",
        response: itinerary._id,
        success: true,
      })
    } catch (error) {
      console.log(error)
      res.status("400").json({
        message: "error while trying to add an itinerary.",
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
          message: "itnierary not found",
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
    try {
      let itnierary = await Itinerary.findOneAndRemove({ _id: id })
      if (itnierary) {
        res.status("200").json({
          message: "itinerary deleted successfully",
          success: true,
        })
      } else {
        res.status(404).json({
          message: "couldn't delete, no such itinerary were found",
          success: false
        })
      }
    } catch (error) {
      console.log(error)
      res.status("400").json({
        message: "error while trying to delete an itinerary",
        success: false,
      })
    }
  }
}

module.exports = itineraryController