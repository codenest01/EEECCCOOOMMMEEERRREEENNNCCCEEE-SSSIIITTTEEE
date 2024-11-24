const Cart = require("../models/cartModel");  // Assuming you already have a Cart model

exports.decreaseProduct = async function (req, res) {
    try {
        const { productId, Qty } = req.body;
        const userId = req.user;
        let cart = await Cart.findOne({ userId });

        // If no cart found for the user, return an error response
        if (!cart) {
            return res.status(400).json({
                msg: "Cart not found"
            });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            if (item.Qty > Qty) {
                const pricePerUnit = item.price / item.Qty;
                item.Qty -= Qty;
                item.price -= pricePerUnit * Qty;
            } else {
                // If the remaining quantity is less than or equal to the requested quantity to remove, remove the item completely
                cart.items.splice(itemIndex, 1);
            }
        } else {
            return res.status(404).json({
                msg: "Product not found in cart"
            });
        }

        await cart.save();  // Save the updated cart

        return res.status(200).json({
            msg: "Item quantity updated successfully",
            cart: cart
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
