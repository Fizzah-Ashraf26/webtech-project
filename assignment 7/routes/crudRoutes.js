const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'Flower - Premium Flower Bouquets',
    currentPage: 'home'
  });
});

// CRUD page route
router.get('/crud', (req, res) => {
  res.render('crud', {
    pageTitle: 'CRUD App - Flower',
    currentPage: 'crud'
  });
});

// Order placed success page route
router.get('/orderplaced', (req, res) => {
  res.render('orderplaced', {
    pageTitle: 'Order Success - Flower',
    currentPage: 'orderplaced'
  });
});

// About section (anchor link on home page)
router.get('/about', (req, res) => {
  res.redirect('/#about');
});

// Gallery section (anchor link on home page)
router.get('/gallery', (req, res) => {
  res.redirect('/#gallery');
});

// Contact/Footer section (anchor link on home page)
router.get('/contact', (req, res) => {
  res.redirect('/#footer');
});

module.exports = router;