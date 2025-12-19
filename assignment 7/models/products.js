const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: ['Bouquets', 'Roses', 'Lillies', 'Orchids', 'Mixed', 'Daisies','Sunflowers'],
        default: 'Bouquets'
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    description:{
        type:String,
        required:true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    }
}, {
    timestamps: true
});

productSchema.index({ name: 'text' });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
