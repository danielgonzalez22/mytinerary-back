const User = require('../models/User')
const crypto = require('crypto')
const bcryptjs = require('bcryptjs');
const sendMail = require('./sendMail')
const Joi = require('joi')

const validator = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Z ]+$/).min(3).max(15).required(),
  lastName: Joi.string().pattern(/^[a-zA-Z ]+$/).min(3).max(15).required(),
  mail: Joi.alternatives().try(Joi.string()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ar", "org"] } }),
  )
    .required().error(new Error("Invalid email")),
  photo: Joi.string().uri().required(),
  country: Joi.string().min(4).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  role: Joi.string().min(3).max(15).required(),
  from: Joi.string().min(3).max(15).required()
})

const userController = {
  signUp: async (req, res) => {
    console.log(req.body)
    let {
      name,
      lastName,
      photo,
      country,
      mail,
      password,
      role,
      from
    } = req.body
    try {
      let user = await validator.validateAsync(req.body)
      await User.findOne({ mail })
      console.log(user)
      if (!user) {
        let loggedIn = false;
        let verified = false;
        let code = crypto
          .randomBytes(15)
          .toString('hex')
        console.log(code)
        if (from === 'form') {
          password = bcryptjs.hashSync(password, 10);

          user = await new User({ name, lastName, photo, country, mail, password: [password], role, from: [from], loggedIn, verified, code }).save()

          sendMail(mail, code)
          res.status(201).json({
            message: "User signed.",
            success: true,
          })
        } else {
          password = bcryptjs.hashSync(password, 10);
          verified = true,
            user = await new User({
              name, lastName, photo, country, mail, password: [password], role,
              from: [from], loggedIn, verified, code
            }).save()
          res.status(201).json({
            message: "User signed from " + from,
            success: true,
          })
        }
      } else {
        if (user.from.includes(from)) {
          res.status(200).json({
            message: "User already exists.",
            success: false
          })
        } else {
          user.from.push(from);
          user.verified = true;
          password = bcryptjs.hashSync(password, 10)
          user.password.push(password)
          await user.save()
          res.status(201).json({
            message: "User signed up from " + from,
            success: true
          })
        }
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({
        message: "could't signed up",
        success: false
      })
    }
  },

  verifyMail: async (req, res) => {
    const { code } = req.params
    try {
      let user = await User.findOne({ code })
      if (user) {
        user.verified = true
        await user.save()
        res.status("200").redirect(301, 'https://mytinerary-front-cgs.herokuapp.com/')

      } else {
        res.status("404").json({
          message: "This email does not belong to an account",
          success: false,
        })
      }
    } catch (error) {
      console.log(error)
      res.status("400").json({
        message: "Error",
        success: false,
      })
    }
  },
  signIn: async (req, res) => {
    const { mail, password, from } = req.body
    try {
      const user = await User.findOne({ mail })
      if (!user) {
        res.status(404).json({
          success: false,
          message: "No account found with the email address provided, please try again... Or sign up",
        })
      } else if (user.verified) {
        const checkPass = user.password.filter(passwordElement => bcryptjs.compareSync(password, passwordElement))
        if (from === 'form') {
          if (checkPass.length > 0) {
            const loginUser = {
              id: user._id,
              name: user.name,
              mail: user.mail,
              role: user.role,
              from: user.from,
              photo: user.photo
            }
            user.loggedIn = true
            await user.save()

            res.status(200).json({
              success: true,
              response: { user: loginUser },
              message: "¡Welcome back, " + user.name + "!"
            })
          } else {
            res.status(400).json({
              success: false,
              message: "Wrong password"
            })
          }
        } else {
          if (checkPass.length > 0) {
            const loginUser = {
              id: user._id,
              name: user.name,
              mail: user.mail,
              role: user.role,
              from: user.from,
              photo: user.photo
            }
            user.loggedIn = true
            await user.save()
            res.status(200).json({
              success: true,
              response: { user: loginUser },
              message: "¡Welcome back, " + user.name + "!"
            })
          } else {
            res.status(400).json({
              success: false,
              message: "Invalid credentials"
            })
          }
        }
      } else {
        res.status(401).json({
          success: false,
          message: "Please check your email and verify your account before logging in"
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({
        success: false,
        message: "Error while trying to sign in"
      })
    }
  },
  signOut: async (req, res) => {
    const { mail } = req.body
    try {
      let user = await User.findOne({ mail: mail })
      if (user) {
        user.loggedIn = false
        await user.save()
        res.status(200).json({
          message: 'Your session has been closed successfully',
          success: true,
          response: user.loggedIn
        })
      } else {
        res.status(404).json({
          message: 'User not found.',
          success: false
        })
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: 'Failed to sign out.',
        success: false
      })
    }
  },
  getUser: async (req, res) => {
    const { id } = req.params
    try {
      let user = await User.findOne({ _id: id })
        .populate('itineraries', { name: 1, city: 1 })
      if (user) {
        res.status("200").json({
          message: "Found.",
          response: user,
          success: true,
        })
      } else {
        res.status("404").json({
          message: "Coud not be found.",
          success: false,
        })
      }
    } catch (error) {
      console.log(error)
      res.status("400").json({
        message: "Error",
        success: false,
      })
    }
  },
  getUsers: async (req, res) => {
    let users
    let query = {}
    if (req.query.users) {
      query.users = req.query.users
    }
    try {
      users = await User.find(query)
      if (users) {
        res.status("200").json({
          message: "Users found!",
          response: users,
          success: true,
        })
      } else {
        res.status("404").json({
          message: "No users could be found.",
          success: false,
        })
      }
    } catch (error) {
      console.log(error)
      res.status("400").json({
        message: "error",
        success: false,
      })
    }
  },
  modifyUser: async (req, res) => {
    const { id } = req.params
    let putUser = {}
    try {
      putUser = await User.findOneAndUpdate({ _id: id }, req.body, { new: true })
      if (putUser) {
        res.status("200").json({
          message: "User updated.",
          response: putUser,
          success: true,
        })
      } else {
        res.status("404").json({
          message: "this User does not exist.",
          success: false,
        })
      }
    } catch (error) {
      console.log(error)
      res.status("400").json({
        message: "Error",
        success: false,
      })
    }
  },
  removeUser: async (req, res) => {
    const { id } = req.params
    try {
      await User.findOneAndDelete({ _id: id })
      res.status("200").json({
        message: "You deleted an User.",
        success: true,
      })
    } catch (error) {
      console.log(error)
      res.status("400").json({
        message: "Error",
        success: false,
      })
    }
  }
}

module.exports = userController;