const reviewModel = require("../models/revieww");

exports.get_review = async function (req, res) {
    try {
        const productId = req.params.id; // Get the product ID from the request params

        // Fetch reviewText, rating, and userName for the given product ID
        const reviews = await reviewModel.find({ product: productId }).select('reviewText rating userName');

        // If no reviews are found for the product, return a message
        if (reviews.length === 0) {
            return res.status(404).json({ msg: "No reviews found for this product" });
        }

        // Return the reviews with the review text, rating, and user name
        return res.status(200).json({ reviews });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
