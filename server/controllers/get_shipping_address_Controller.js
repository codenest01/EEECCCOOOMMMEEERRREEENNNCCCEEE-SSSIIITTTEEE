const AddressModel = require("../models/adressModel"); // Ensure the file name is correct

exports.getShipingAddress = async function (req, res) {
    try {
        const addresses = await AddressModel.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .select('-_id -userId -createdAt -__v'); // Exclude unnecessary fields

        res.status(200).json({
            msg: "Addresses retrieved successfully",
            userAddress: addresses
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};
