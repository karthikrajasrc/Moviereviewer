const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    Name: String,
    Star: Number,
    Comment: String,
    movieId: String,
    userId: String
})

module.exports = mongoose.model("Comment", CommentSchema, "Comments");