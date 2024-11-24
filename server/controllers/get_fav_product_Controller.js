const Favourite = require("../models/favouriteProducts");

exports.getFavorites = async (req, res) => {
    try {
        // Ensure user ID is available
        const userId = req.user;
        if (!userId) {
            return res.status(400).json({
                message: "User ID is missing in the request."
            });
        }

        // Find the user's favorite products list
        const favouriteProduct = await Favourite.findOne({ userId }).populate('items'); // populate if items are refs

        if (!favouriteProduct) {
            return res.status(404).json({
                message: "No favorites found for this user."
            });
        }

        // Return the list of favorite items
        return res.status(200).json({
            message: "Favorite products retrieved successfully",
            items: favouriteProduct.items
        });
    } catch (err) {
        console.error("Error retrieving favorite products:", err.message);
        res.status(500).json({ message: "An error occurred while retrieving favorite products.", error: err.message });
    }
};
