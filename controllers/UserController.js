const User = require('../models/User');

const userController = {
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
        message: "error while trying to create a user",
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
          message: "user found",
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
        message: "error while trying to get a user",
        succes: false,
      })
    }
  },
  getAllUsers: async (req, res) => {
    let users
    let query = {}
    if (req.query.user) {
      query.user = req.query.user
    }
    try {
      users = await User.find(query)
      if (users) {
        res.status("200").json({
          message: "the following users were found",
          response: users,
          success: true,
        })
      } else {
        res.status("404").json({
          message: "no users found",
          success: false,
        })
      }
    } catch (error) {
      console.log(error)
      res.status("400").json({
        message: "error while trying to get all users",
        succes: false,
      })
    }
  },
}
module.exports = userController;