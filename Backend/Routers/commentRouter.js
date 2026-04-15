const { addComment, getComments } = require("../Controllers/commentController");
const { isAuthenticated } = require("../Middlewares/auth");

const commentRouter = require("express").Router();


commentRouter.post("/add", isAuthenticated, addComment);
commentRouter.get("/:movieId", getComments);

module.exports = commentRouter;