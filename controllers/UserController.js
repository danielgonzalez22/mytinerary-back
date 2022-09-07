const User = require('../models/User');

const userController ={
    createUser: async (req, res) => {
        try {
            let user = await new User(req.body).save()
            res.status("201").json({
                message: "user created successfully",
                response: user._id,
                success: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "could not create user",
                success: false,
            })
        }
    },
    getUser: async (req, res) => {
        const { id } = req.params
        try {
            let user = await User.findOne({ _id: id })
            if (user) {
                res.status("200").json({
                    message: "found user",
                    response: user,
                    success: true,
                })
            } else {
                res.status("404").json({
                    message: "user not found",
                    success: false,
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

}

module.exports =userController;