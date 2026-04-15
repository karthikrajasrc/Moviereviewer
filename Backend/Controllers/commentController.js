const { get } = require("mongoose");
const Comment = require("../Models/commentModel");

const commentController = {
    addComment: async (req, res) => {
        try {

            const userid = req.userID;
            
            const { Name, Star, Comment: userComment, movieId } = req.body;

            const newComment = new Comment({ Name, Star, Comment: userComment, movieId, userId: userid });

            const savedComment = await newComment.save();

            res.status(200).json({ message: "Comment added successfully", comment: savedComment });
        } catch (error) {
            res.status(500).json({ message: "Error adding comment", error: error.message });
        }
    }, getComments: async (req, res) => {
        try {
            const { movieId } = req.params;
            const comments = await Comment.find({ movieId });
            res.status(200).json({ comments });
            console.log(comments);
        } catch (error) {
            res.status(500).json({ message: "Error fetching comments", error: error.message });
        }
    }
}

module.exports = commentController;