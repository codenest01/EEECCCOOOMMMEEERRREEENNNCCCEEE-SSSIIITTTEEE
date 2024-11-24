const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a 'User' model
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Assuming you have a 'Product' model
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
       
        imageSrc: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = Favourite;
