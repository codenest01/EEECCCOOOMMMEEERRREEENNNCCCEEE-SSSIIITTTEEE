const Cart = require("../models/cartModel");

exports.clearCart = async function (req, res) {

    const userId = req.user;
    let cart = await Cart.findOne({userId});
    if(!cart){
        cart = new Cart({items:[]})
    }
    else{
        cart.items = []
    }
    cart.items = cart.items.filter((item)=>item.productId.toString() !==  productId)
    await cart.save()
    return res.status(200).json({
        msg:"cleared all carts",
    })
}