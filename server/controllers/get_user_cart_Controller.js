const Cart = require("../models/cartModel");

exports.getUserCart = async function (req, res) {
    const userId = req.user;
    let cart = await Cart.findOne({userId});
    if(!cart){
        return res.status(400).json({
            msg:"cart not found"
        })
    }
    return res.status(200).json({
        msg:"user cart",
        cart:cart
    })
}