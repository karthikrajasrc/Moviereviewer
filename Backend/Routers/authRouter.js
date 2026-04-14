const { registerUser, loginUser, logoutUser, me } = require('../Controllers/authController');
const { isAuthenticated } = require('../Middlewares/auth');

const authRouter = require('express').Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get("/logout", isAuthenticated , logoutUser);
authRouter.get("/me", isAuthenticated , me);

module.exports = authRouter;