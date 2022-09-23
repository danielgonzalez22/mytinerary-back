const City = require('../models/City')
const Joi = require('joi')

const validator = Joi.object({
  city: Joi.string().pattern(/^[a-zA-Zñ ]+$ /).min(3).max(15).required().error(new Error('City name must have between 3 and 15 characters, letters only.')),
  country: Joi.string().pattern(/^[a-zA-Zñ ]+$ /).min(4).max(15).required().error(new Error('Country name must have between 4 and 15 characters, letters only.')),
  photo: Joi.string().uri().required().error(new Error("Invalid photo url.")),
  population: Joi.number().integer().min(1000).max(100000000).required().error(new Error("Population must be a number between 1000 and 100M.")),
  foundation: Joi.date().required().error(new Error("Invalid foundation year.")),
  description: Joi.string().pattern(/^[a-zA-Zñ ]+$ /).min(10).max(300).required().error(new Error('Description text must have between 10 and 300 characters, letters only.'))
})

const cityController = {
  create: async (req, res) => {
    let { city, country, photo, population, foundation, description } = req.body
    try {
      let result = await validator.validateAsync(req.body)
      let city = await new City(req.body).save()
      res.status(201).json({
        message: 'City created successfully',
        response: city._id,
        success: true
      })
    } catch (error) {
      res.status(400).json({
        message: "Error while trying to create a city",
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
          message: "The following cities were found",
          response: cities,
          success: true,
        })
      } else {
        res.status("404").json({
          message: "No cities found.",
          success: false,
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Error while trying to read all cities",
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
          message: "City found",
          response: city,
          success: true
        })
      } else {
        res.status(404).json({
          message: "City not found",
          success: false
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({
        message: "Error while trying to find a city",
        success: false
      })
    }
  },
  update: async (req, res) => {
    const { id } = req.params
    const city = req.body
    try {
      let result = await validator.validateAsync(req.body)
      let updatedCity = await City.findOneAndUpdate({ _id: id }, city, { new: true })
      if (updatedCity) {
        res.status(200).json({
          message: "City updated successfully",
          success: true
        })
      } else {
        res.status(404).json({
          message: "Couldn't update, no such city were found",
          success: false
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({
        message: "Error while trying to update a city",
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
          message: "City found and deleted",
          success: true
        })
      } else {
        res.status(404).json({
          message: "Couldn't delete, no such city were found",
          success: false
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({
        message: "Error while trying to delete a city",
        success: false
      })
    }
  }
}
module.exports = cityController