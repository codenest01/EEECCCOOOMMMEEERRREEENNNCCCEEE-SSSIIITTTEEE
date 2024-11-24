const productModel = require("../models/productModel");

exports.getProductByID = async function (req, res) {
    try {
        const id = req.params.id;
        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                msg: "Product not found"
            });
        }

        return res.status(200).json({
            product: product
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};
