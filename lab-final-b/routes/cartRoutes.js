const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('cart', {
    pageTitle: 'Shopping Cart - Flower',
    currentPage: 'cart'
  });
});

module.exports = router;