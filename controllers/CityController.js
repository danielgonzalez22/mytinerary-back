const City = require('../models/City')

const cityController = {
  create: async (req, res) => {
    //const {city,country,photo,population,foundation} = req.body
    try {
      let city = await new City(req.body).save()
      res.status(201).json({
        message: 'city created successfully',
        response: city._id,
        success: true
      })
    } catch (error) {
      res.status(400).json({
        message: "error while trying to create a city",
        success: false
      })
    }
  },
  readAll: async (req, res) => {
    let cities
    let query = {}
    if (req.query.city) {
      query.city = req.query.city
    }
    if (req.query.country) {
      query.country = req.query.country
    }
    try {
      cities = await City.find(query)
      if (cities) {
        res.status("200").json({
            message: "the following cities were found",
            response: cities,
            success: true,
    })
    } else {
        res.status("404").json({
            message: "no cities found.",
            success: false,
        })
    }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "error while trying to read all cities",
        success: false
      })
    }
  },
  readOne: async (req, res) => {
    const { id } = req.params
    try {
      let city = await City.findOne({ _id: id })
      if (city) {
        res.status(200).json({
          message: "city found",
          response: city,
          success: true
        })
      } else {
        res.status(404).json({
          message: "city not found",
          success: false
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({
        message: "error while trying to find a city",
        success: false
      })
    }
  },
  update: async (req, res) => {
    const { id } = req.params
    const city = req.body
    let updatedCity
    try {
      updatedCity = await City.findOneAndUpdate({ _id: id }, city, { new: true })
      if (updatedCity) {
        res.status(200).json({
          message: "city updated successfully",
          success: true
        })
      } else {
        res.status(404).json({
          message: "couldn't update, no such city were found",
          success: false
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({
        message: "error while trying to update a city",
        success: false
      })
    }
  },
  destroy: async (req, res) => {
    const { id } = req.params
    try {
      let city = await City.findOneAndRemove({ _id: id })
      if (city) {
        res.status(200).json({
          message: "city found and deleted",
          success: true
        })
      } else {
        res.status(404).json({
          message: "couldn't delete, no such city were found",
          success: false
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({
        message: "error while trying to delete a city",
        success: false
      })
    }
  }
}
module.exports = cityController