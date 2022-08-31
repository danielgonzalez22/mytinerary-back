const City = require('../models/City')

const cityController = {
    create: async(req,res) => {
        //const {city,country,photo,population,foundation} = req.body
        try {
            await new City(req.body).save()
            res.status(201).json({
                message: 'city created',
                success: true
            })
        } catch (error) {
            res.status(400).json({
                message: "couldn't create city"
            })
        }
    },
    read: async(req, res) => {
        try {
            
        } catch (error) {
            
        }
    }
}
module.exports = cityController