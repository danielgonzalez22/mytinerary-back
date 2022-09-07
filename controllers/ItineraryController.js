const Itinerary = require("../models/Itinerary")

const itineraryController = {
    addItinerary: async (req, res) => {
        try {
            let itinerary = await new Itinerary(req.body).save()
            res.status("201").json({
                message: "New itinerary added successfully.",
                response: itinerary._id,
                succes: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Could not add itinerary.",
                succes: false,
            })
        }
    },
    getItineraries: async (req, res) => {
        let itineraries
        let query = {}
        if(req.query.city){
            query.city = req.query.city
        }
        if (req.query.user) {
            query.user = req.query.user
        }
        try {
            itineraries = await Itinerary.find(query)
            .populate("user",{name:1})
            .populate("city",{city:1})
            if (itineraries) {
                res.status("200").json({
                    message: "The following itineraries were found.",
                    response: itineraries,
                    succes: true,
            })
            } else {
                res.status("404").json({
                    message: "No itineraries found.",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Unaggregated itinerary.",
                succes: false,
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
                    message: "You have updated an itinerary.",
                    response: itinerary,
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "Could not find the itinerary.",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your itinerary could not be found.",
                succes: false,
            })
        }
    },
    removeItinerary: async (req, res) => {
        const { id } = req.params
        try {
            await Itinerary.findOneAndRemove({ _id: id })
            res.status("200").json({
                message: "You deleted a itinerary.",
                succes: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                succes: false,
            })
        }
    }
}

module.exports = itineraryController