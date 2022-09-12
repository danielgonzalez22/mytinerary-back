const Activity = require('../models/Activity')


const activitiesController = {

    createActivity: async (req, res) => {
        try {
            let activity = await new Activity(req.body).save()
            res.status("201").json({
                message: "activity created successfully",
                response: activity._id,
                succes: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "couldn't create an activity",
                succes: false,
            })
        }
    },
    getActivity: async (req, res) => {
        const { id } = req.params
        try {
            let activity = await Activity.findOne({ _id: id })
            if (activity) {
                res.status("200").json({
                    message: "activity found",
                    response: activity,
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "activity not found",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "error while trying to get an activity",
                succes: false,
            })
        }
    },
    getActivities: async (req, res) => {
        let activities
        let query = {}
        if (req.query.itinerary) {
            query.itinerary = req.query.itinerary
        }
        try {
            activities = await Activity.find(query)
                .populate("itinerary", { name: 1 })
            if (activities) {
                res.status("200").json({
                    message: "the following activities were found",
                    response: activities,
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "no activities found",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "error while trying to get all activities",
                succes: false,
            })
        }
    },
    modifyActivity: async (req, res) => {
        const { id } = req.params
        let activities
        try {
            activities = await Activity.findOneAndUpdate({ _id: id }, req.body, { new: true })
            if (activities) {
                res.status("200").json({
                    message: "activity updated successfully",
                    response: activities,
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "couldn't update, no such activity were found",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "error while trying to update an activity",
                succes: false,
            })
        }
    },
    removeActivity: async (req, res) => {
        const { id } = req.params
        try {
            let activity = await Activity.findOneAndRemove({ _id: id })
            if (activity) {
                res.status("200").json({
                    message: "activity deleted successfully",
                    succes: true,
                })
            } else {
                res.status(404).json({
                    message: "couldn't delete, no such activity were found",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "error while trying to delete an activity",
                succes: false,
            })
        }
    }
}

module.exports = activitiesController