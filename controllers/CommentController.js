const Comment = require('../models/Comment')

const commentController = {

    create: async (req, res) => {
        const {
            comment,
            user, 
            itinerary,
        } = req.body

        try {
            await new Comment({ user, comment, itinerary, })

            res.status(201).json({
                message: 'Comment created',
                success: true
            })
        } catch (error) {
            res.status(400).json({
                message: "couldn't create comment",
                success: false
            })

        }
    },
    read: async (req, res) => {
        const { id } = req.params
        try {
            let CommentOne = await Comment.findOne({ _id: id },)

            if (CommentOne) {

                res.status(200).json({
                    message: 'You get one comment',
                    response: CommentOne,
                    success: true
                })

            } else {
                res.status(404).json({
                    message: "couldn't find comment",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "",
                success: false
            })
        }
    },


}

module.exports = commentController