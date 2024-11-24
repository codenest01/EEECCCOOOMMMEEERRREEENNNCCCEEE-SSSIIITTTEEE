const Favourite = require("../models/favouriteProducts");

exports.addToFavorites = async function (req, res) {
    try {
        const { productId, title, price, imageSrc } = req.body;
        const userId = req.user;
        let favourite = await Favourite.findOne({ userId });

        // If no favourite found for the user, create a new one
        if (!favourite) {
            favourite = new Favourite({ userId, items: [] });
        }

        // Check if the product is already in the user's favorites
        const itemIndex = favourite.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            // Product already in the favorites
            return res.status(400).json({
                msg: "Item already in favorites"
            });
        } else {
            // Add new item to the favorites
            favourite.items.push({ productId, title, price, imageSrc });
        }

        await favourite.save();  // Save the updated favorites

        return res.status(200).json({
            msg: "Item added to favorites successfully",
            favourite: favourite
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
