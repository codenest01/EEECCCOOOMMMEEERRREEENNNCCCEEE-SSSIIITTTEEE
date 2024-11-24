const mongoose = require('mongoose');

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",  
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    Qty: {
        type: Number,
        required: true
    },
    imageSrc: {
        type: String,
        required: true
    }
});

// Main Cart Schema
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registers", 
        required: true  
    },
    items: [cartItemSchema],  
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
