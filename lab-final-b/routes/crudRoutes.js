const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'Flower - Premium Flower Bouquets',
    currentPage: 'home'
  });
});

router.get('/crud', (req, res) => {
  res.render('crud', {
    pageTitle: 'CRUD App - Flower',
    currentPage: 'crud'
  });
});

router.get('/orderplaced', (req, res) => {
  res.render('orderplaced', {
    pageTitle: 'Order Success - Flower',
    currentPage: 'orderplaced'
  });
});

router.get('/about', (req, res) => {
  res.redirect('/#about');
});

router.get('/gallery', (req, res) => {
  res.redirect('/#gallery');
});

router.get('/contact', (req, res) => {
  res.redirect('/#footer');
});

module.exports = router;