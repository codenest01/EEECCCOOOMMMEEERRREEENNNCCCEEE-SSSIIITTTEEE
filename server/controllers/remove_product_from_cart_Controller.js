const Cart = require("../models/cartModel");

exports.removeProductFromcart = async function (req, res) {
    const productId = req.params.productId;
    const userId = req.user;
    let cart = await Cart.findOne({userId});
    if(!cart){
        return res.status(400).json({
            msg:"cart not found"
        })
    }
    cart.items = cart.items.filter((item)=>item.productId.toString() !==  productId)
    await cart.save()
    return res.status(200).json({
        msg:"product removed from cart",
    })
}