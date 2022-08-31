const City = require('../models/City')

const cityController = {
  create: async (req, res) => {
    //const {city,country,photo,population,foundation} = req.body
    try {
      await new City(req.body).save()
      res.status(201).json({
        message: 'city created',
        cityId: req.body.id,
        success: true
      })
    } catch (error) {
      res.status(400).json({
        message: "couldn't create city",
        success: false
      })
    }
  },
  readAll: async (req, res) => {
    let cities
    try {
      cities = await City.find()
      res.json(cities)
    } catch (error) {
      console.log(error)
      res.status(500).json()
    }
  },
  readOne: async (req, res) => {
    const { id } = req.params
    try {
      let city = City.findOne({ _id: id })
      if (city) {
        res.status(200).json({
          message: "city found",
          response: city,
          success: false
        })
      }else{
        res.status(404).json({
          message: "couldn' find city",
          success: false
        })
      }
    } catch (error) {
      res.status(400).json({
        message: "",
        success: false
      })
    }
  }
}
module.exports = cityController