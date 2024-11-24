const productModel = require("../models/productModel");

exports.deleteProductByID = async function (req, res) {
    try {
        const id = req.params.id;
        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                msg: "Product not found"
            });
        }

        return res.status(200).json({
            msg: "Product deleted successfully",
            deletedProduct: deletedProduct
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};
