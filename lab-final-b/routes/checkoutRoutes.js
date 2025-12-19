const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('checkout', {
    pageTitle: 'Checkout - Flower',
    currentPage: 'checkout'
  });
});

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

  console.log('Order received:', orderData);
  
  res.redirect('/orderplaced');
});

module.exports = router;