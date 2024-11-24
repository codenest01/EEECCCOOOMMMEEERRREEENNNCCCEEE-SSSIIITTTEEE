const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Assuming you have a Product model
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewText: {
        type: String,
        required: true
    },
    userName: {
        type: String, // Add this field to store the user's name
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    isVisible: {
        type: Boolean,
        default: true // You can set this to false if the review is pending moderation
    }
});

module.exports = mongoose.model('Review', reviewSchema);
