const userModel = require("../models/userModel")

exports.allusers = async function (req, res) {
    try {
        const allusers = await userModel.find().sort({ createdAt: -1 });
        return res.status(200).json({
            allusers:allusers
 })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            msg: "internal server error"
        })
    }
}