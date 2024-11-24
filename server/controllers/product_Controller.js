const productModel = require("../models/productModel");

exports.createProduct = async function (req, res) {
    try {
        const { title, description, price, category, Qty, imageSrc } = req.body;

        // Validate required fields
        if (!title || !description || !price || !category || !Qty || !imageSrc) {
            return res.status(400).json({
                msg: "All fields are required."
            });
        }

        // Create new product
        const newProduct = new productModel({
            title,
            description,
            price,
            category,
            Qty,
            imageSrc
        });

        // Save product to database
        const savedProduct = await newProduct.save();

        // Respond with the newly created product
        return res.status(201).json({
            msg: "Product created successfully!",
            product: savedProduct
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};
