const userModel = require("../models/userModel");

exports.profile = async function (req, res) {
    try {
        // Assuming `req.user` contains the user information after being authenticated
        const userId = req.user._id;  // this is set in ensureAuthenticated middleware

        // Fetch user data by ID
        const user = await userModel.findById(userId).select('name email');  // only select name and email fields

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        return res.status(200).json({
            name: user.name,
            email: user.email
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};
