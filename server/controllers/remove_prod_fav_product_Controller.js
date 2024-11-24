const Favourite = require("../models/favouriteProducts");

// In your favouriteController.js
exports.del_fav = async function (req, res) {
    const productId = req.params.productId; // Get productId from URL params
    const userId = req.user; // Ensure user is available from authentication middleware

    try {
        let fav_cart = await Favourite.findOne({ userId });
        if (!fav_cart) {
            return res.status(400).json({ msg: "Favourite cart not found" });
        }

        const productIndex = fav_cart.items.findIndex(item => item.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(400).json({ msg: "Product not found in your favourite cart" });
        }

        fav_cart.items.splice(productIndex, 1);
        if (fav_cart.items.length === 0) {
            await fav_cart.deleteOne();
        } else {
            await fav_cart.save();
        }

        return res.status(200).json({ msg: "Product removed from favourite cart" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred while removing the product", error: error.message });
    }
};
