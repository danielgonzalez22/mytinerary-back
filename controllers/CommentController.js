const Comment = require('../models/Comment')

const commentController = {

  create: async (req, res) => {
    const {
      comment,
      user,
      itinerary,
    } = req.body
    try {
      await new Comment({ user, comment, itinerary, }).save()
      res.status(201).json({
        message: 'comment created successfully',
        success: true
      })
    } catch (error) {
      res.status(400).json({
        message: "error while trying to create a comment",
        success: false
      })
    }
  },
  // read: async (req, res) => {
  //   const { id } = req.params
  //   try {
  //     let CommentOne = await Comment.findOne({ _id: id })
  //     if (CommentOne) {
  //       res.status(200).json({
  //         message: 'comment found',
  //         response: CommentOne,
  //         success: true
  //       })
  //     } else {
  //       res.status(404).json({
  //         message: "comment not found",
  //         success: false
  //       })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     res.status(400).json({
  //       message: "error while trying to get a comment",
  //       success: false
  //     })
  //   }
  // },
  getComments: async (req, res) => {
    let itineraries
    let query = {}
    if (req.query.itinerary) {
      query.itinerary = req.query.itinerary
    }
    if (req.query.user) {
      query.user = req.query.user
    }
    try {
      comments = await Comment.find(query)
        .populate("user", { name: 1, lastName: 1, photo: 1 })
        .populate("itinerary", { _id: 1 })
      if (comments) {
        res.status("200").json({
          message: "the following comments were found",
          response: comments,
          success: true,
        })
      } else {
        res.status("404").json({
          message: "no comments found",
          success: false,
        })
      }
    } catch (error) {
      console.log(error)
      res.status("400").json({
        message: "error while trying to get all comments",
        success: false,
      })
    }
  }
}

module.exports = commentController