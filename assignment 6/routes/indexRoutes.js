const express = require('express');
const router = express.Router();

// Import route modules
const pageRoutes = require('./crudRoutes');
const productRoutes = require('./productRoutes');
const checkoutRoutes = require('./checkoutRoutes');
// const apiRoutes = require('./apiRoutes');

// Mount routes
router.use('/', pageRoutes);
router.use('/products', productRoutes);
router.use('/checkout', checkoutRoutes);
// router.use('/crud/api', apiRoutes);

module.exports = router;