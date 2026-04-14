require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/authModel");

const authController = {
    registerUser: async (req, res) => {
        try {
            const { Name, Email, Password } = req.body;
            
            if (Name === "" || Email === "" || Password === "") {
                return res.status(400).json({Message: "Please Fill required Fields!"})
            }

            const alreadyRegister = await User.findOne({ Email });

            if (alreadyRegister) {
                return res.status(400).json({Message: "Account Already Exists!! Please Login!"})
            }

            const hasedPassword = await bcrypt.hash(Password, 10);

            const newUser = new User({
                Name, Email, Password: hasedPassword
            })

            const saveduser = await newUser.save();

            return res.status(200).json({ Message: "Account Regsitered Succesfully !", User: saveduser });

        }
        catch (error) {
            return res.status(500).json({ Message: "Registration Failed!", Error: error.Message });
        }
    }, 
    loginUser: async (req, res) => {
        try {
            const { Email, Password } = req.body;

            const loggedUser = await User.findOne({ Email });

            const user = {
                Name: loggedUser.Name,
                Email: loggedUser.Email
            }

            if (!loggedUser) {
                return res.status(404).json({ Message: "No Account Found!! Please Signup" });
            }

            const isPasswordvalid = await bcrypt.compare(Password, loggedUser.Password);

            if (!isPasswordvalid) {
                return res.status(401).json({ Message: "Password Incorrect" });
            }

            const token = await jwt.sign({ id: loggedUser._id }, process.env.JWT_SECRET, { expiresIn: "3h" });

            res.status(200).json({ 
  Message: "login Successfull!", 
  user,
  Token: token
});

        }
        catch(error) {
             return res.status(400).json({ Message: `Error found on Login!! ${error.message}` });
        }
    },
    logoutUser: async (req, res) => {
        try {
            res.status(200).json({ message: "Logged out Successfully" });
        }
        catch(error) {
            return res.status(400).json({ Message: `Error found on Logout!! ${error.message}` });
        }
    },
    me: async (req, res) => {
        try {
            const userid = req.userID;
            
            const user = await User.findById(userid);

            return res.status(200).json({ user: user });

        }
        catch (error) {
            return res.status(500).json({ Message: "Error found on Login!!" });
        }
    },

}

module.exports = authController;