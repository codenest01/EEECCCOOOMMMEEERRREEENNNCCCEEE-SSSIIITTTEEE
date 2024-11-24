const reviewModel = require("../models/revieww");
const users = require("../models/userModel");
const products = require("../models/productModel");

exports.add_review = async function (req, res) {
    try {
        const { review, rating } = req.body;
        const productId = req.params.id;
        const userId = req.user._id;

        if (!review || !rating || !productId) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ msg: "Rating must be between 1 and 5" });
        }

        const existingReview = await reviewModel.findOne({ user: userId, product: productId });

        if (existingReview) {
            return res.status(400).json({ msg: "You have already reviewed this product" });
        }

        // Get the user's name
        const user = await users.findById(userId);

        // If user is not found
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const newReview = new reviewModel({
            user: userId,
            product: productId,
            rating,
            reviewText: review,
            userName: user.name // Store the user's name with the review
        });

        await newReview.save();

        // Update the totalReviews and averageRating in the Product model
        const reviews = await reviewModel.find({ product: productId });
        const averageRating = reviews.length > 0 
            ? parseFloat((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(2))
            : 0;

        const totalReviews = reviews.length;

        await products.findByIdAndUpdate(productId, {
            totalReviews,
            averageRating
        });

        return res.status(201).json({ msg: "Review added successfully", review: newReview });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
