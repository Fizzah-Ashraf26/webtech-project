const express = require('express');
const router = express.Router();

// Checkout page route
router.get('/', (req, res) => {
  res.render('checkout', {
    pageTitle: 'Checkout - Flower',
    currentPage: 'checkout'
  });
});

// Handle checkout form submission
router.post('/', (req, res) => {
  const orderData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    postal: req.body.postal,
    country: req.body.country,
    paymentMethod: req.body.payment
  };

  // In a real application, you would save this to a database
  console.log('Order received:', orderData);
  
  // Redirect to order success page
  res.redirect('/orderplaced');
});

module.exports = router;