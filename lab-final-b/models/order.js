// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  customer: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    postal: String,
    country: String
  },
  paymentMethod: String,
  totalAmount: Number,
  discount: {
    coupon: String,
    original: Number,
    total: Number
  },
  status: {
    type: String,
    enum: ['Placed', 'Processing', 'Delivered'],
    default: 'Placed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
