const productModel = require("../models/productModel");

exports.allproducts = async function (req, res) {
    try {
        const allproducts = await productModel.find().sort({ createdAt: -1 });
        return res.status(200).json({
            allproducts: allproducts
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};
