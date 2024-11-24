const Cart = require("../models/cartModel");

exports.addToCart = async function (req, res) {
    try {
        const { productId, title, price, Qty, imageSrc } = req.body;
        const userId = req.user
        let cart = await Cart.findOne({ userId });
        
        // If no cart found for the user, create a new one
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex > -1) {
            // Update the existing item's quantity and price
            cart.items[itemIndex].Qty += Qty;
            cart.items[itemIndex].price += price * Qty;
        } else {
            // Add new item to the cart
            cart.items.push({ productId, title, price, Qty, imageSrc });
        }

        await cart.save();  // Save the updated cart

        return res.status(200).json({
            msg: "Item added to cart successfully",
            cart: cart
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
