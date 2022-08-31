const City = require('../models/City')

const cityController = {
    create: async(req,res) => {
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
    readAll: async(req, res) => {
        let cities
        try {
            cities = await City.find()
            res.json(cities)
        } catch (error) {
            console.log(error)
            res.status(500).json()
        }
    },
    readOne: async(req, res) => {
        try {
            
        } catch (error) {
            
        }
    }
}
module.exports = cityController