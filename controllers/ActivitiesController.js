const Activity= require('../models/Activity')


const activitiesController ={

    createActivity: async (req, res) => {
        try {
            let activity = await new Activity(req.body).save()
            res.status("201").json({
                message: "Activity created",
                response: activity._id,
                succes: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "There is something wrong...",
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
                    message: "activity found ",
                    response: activity,
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "Coud not be found ",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                succes: false,
            })
        }
    },
    getActivities: async (req, res) => {
        let activities
        let query = {}
        if(req.query.itinerary){
            query.itinerary = req.query.itinerary
        }
        try {
            activities = await Activity.find(query)
            .populate("itinerary",{name:1})
            if (activities) {
                res.status("200").json({
                    message: "The following activities were found.",
                    response: activities,
                    succes: true,
            })
            } else {
                res.status("404").json({
                    message: "No activities could be found...",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your activity could not be added.",
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
                    message: "Content updated.",
                    response: activities,
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "Could not find it...",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "error",
                succes: false,
            })
        }
    },
    removeActivity: async (req, res) => {
        const { id } = req.params
        try {
            await Activity.findOneAndRemove({ _id: id })
            res.status("200").json({
                message: "Deleted",
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

module.exports = activitiesController