const AddressModel = require("../models/adressModel");  // Ensure this path is correct

exports.addShippingAddress = async function (req, res) {
    try {
        let { fullName, address, city, state, country, pincode, phoneNumber } = req.body;
        let userId = req.user._id;  // Access user ID from req.user

        // Create the address document
        let userAddress = await AddressModel.create({
            userId,
            fullName,
            address,
            city,
            state,
            country,
            pincode,
            phoneNumber
        });

        return res.status(201).json({
            msg: "Address added successfully",
            address: userAddress  // Optional: Return the created address
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};
