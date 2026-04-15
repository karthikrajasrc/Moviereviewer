const express = require('express');
const authRouter = require('./Routers/authRouter');
const app = express();
const cors = require('cors');
const commentRouter = require('./Routers/commentRouter');

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/auth", authRouter);
app.use("/comment", commentRouter);


module.exports = app;