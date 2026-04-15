const express = require('express');
const authRouter = require('./Routers/authRouter');
const app = express();
const cors = require('cors');
const commentRouter = require('./Routers/commentRouter');

app.use(express.json());

app.use(cors({
    origin: ["https://moviesreviewe.netlify.app","http://localhost:5173"],
    credentials: true
}));

app.use("/auth", authRouter);
app.use("/comment", commentRouter);

app.get("/ping", (req, res) => {
  res.status(200).send("Server is alive 🚀");
});


module.exports = app;