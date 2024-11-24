const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken');


exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;

        // Check if username and password are provided
        if (!email || !password) {
            return res.status(400).json({
                msg: "Username and password are required."
            });
        }

        //Check user existance
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: "User not exist"
            })
        }

        //Check user password
        const matchPAssword = await bcrypt.compare(password, user.password)
        if (!matchPAssword) {
            return res.status(400).json({
                msg: "password is incorrect"
            })
        }

        //login success
        const jwtToken = jwt.sign(
            {_id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '12h' })
        return res.status(200).json({
            msg: "Logged in success",
            token: jwtToken          
        })


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            msg: "internal server error"
        })
    }
}