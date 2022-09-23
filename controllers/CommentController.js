const Comment = require('../models/Comment')

const commentController = {

  addComment: async (req, res) => {
    let {
        comment:textComment,
        itinerary
    } = req.body
    let user = req.user.userId
    try {
        let comment = await new Comment({
            comment: textComment,
            itinerary,
            user,
            date: new Date()
        }).save()
        res.status("201").json({
            message: "your comment has been added",
            response: comment._id,
            success: true,
        })
    } catch (error) {
        console.log(error)
        res.status("400").json({
            message: "something wrong with your comment.",
            success: false,
        })
    }
},   
//falta get comments
getComment: async (req, res) => {
  const { id } = req.params
  try {
      let comment = await Comment.findOne({ _id: id })
      if (comment) {
          res.status("200").json({
              message: "Comment found",
              response: comment,
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
getComments: async (req, res) => {
  let comments
  let query = {}
  if(req.query.itinerary){
      query.itinerary = req.query.itinerary
  }
  if (req.query.user) {
      query.user = req.query.user
  }
  try {
      comments = await Comment.find(query)
      .populate("user",{name:1, lastname:1, country:1, photo:1})
      .populate("itinerary",{name:1})
      if (comments) {
          res.status("200").json({
              message: "the following comments were found.",
              response: comments,
              success: true,
      })
      } else {
          res.status("404").json({
              message: "no comments could be found.",
              success: false,
          })
      }
  } catch (error) {
      console.log(error)
      res.status("400").json({
          message: "your comment could not be added.",
          success: false,
        })
        }
},
//falta modify comment
modifyComment: async (req, res) => {
  const { id } = req.params
  let { comment: commentText } = req.body
  const {userId, role} = req.user
  let comment
  try {
      comment = await Comment.findOne({ _id: id })
      if (comment) {
          if (comment.user.toString() === userId.toString() || role === "admin") {
              comment.comment = commentText
              comment.date = new Date()
              await comment.save()
              res.status("200").json({
                  message: "You editted your comment.",
                  response: comment,
                  success: true,
              })
          } else {
              res.status("401").json({
                  message: "Unahutorized",
                  success: false,
              })
          }
      } else {
          res.status("404").json({
              message: "Could not find the comment.",
              success: false,
          })
      }
  } catch (error) {
      console.log(error)
      res.status("400").json({
          message: "Your comment was not found.",
          success: false,
      })
  }
},
removeComment: async (req, res) => {
  const { id } = req.params
  const { userId, role } = req.user
  let comment
  try {
      comment = await Comment.findOne({_id:id})
      if (comment.user.toString() === userId.toString() || role === "admin") {
          await Comment.findOneAndRemove({ _id: id })
          res.status("200").json({
              message: "You deleted this comment.",
              success: true,
          })
      } else {
          res.status("401").json({
              message: "Unahutorized",
              success: true,
          })
      }
  } catch (error) {
      console.log(error)
      res.status("400").json({
          message: "Error",
          success: false,
      })
  }
}
}
//falta remove comment

module.exports = commentController