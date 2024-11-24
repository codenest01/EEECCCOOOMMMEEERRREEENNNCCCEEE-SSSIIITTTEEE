const mongoose = require('mongoose');

// Define the product schema without reviews and ratings
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    Qty: {
        type: Number,
        required: true,
        min: 0
    },
    imageSrc: {
        type: String,
        required: true,
        trim: true
    },
    averageRating: {
        type: Number,
        default: 0 // Default to 0 if no reviews are present
    },
    totalReviews: {
        type: Number,
        default: 0 // Initialize with 0 reviews
    },
}, { timestamps: true });

// Check if the Product model already exists, otherwise define it
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
