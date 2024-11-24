const productModel = require("../models/productModel");

exports.updateProductByID = async function (req, res) {
    try {
        const id = req.params.id;
        
        // Extract the data you want to update from req.body
        const { title, description, price, category, Qty, imageSrc } = req.body;

        // Find the product by ID and update it
        const updatedProduct = await productModel.findByIdAndUpdate(
            id, 
            {
                title,
                description,
                price,
                category,
                Qty,
                imageSrc
            },
            { new: true } // This option returns the updated document
        );

        // Check if the product was found and updated
        if (!updatedProduct) {
            return res.status(404).json({ msg: "Product not found." });
        }

        // Send the updated product as the response
        return res.status(200).json({
            msg: "Product updated successfully.",
            product: updatedProduct
        });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};
