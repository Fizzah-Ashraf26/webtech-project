const express = require('express');
const router = express.Router();

const pageRoutes = require('./crudRoutes');
const productRoutes = require('./productRoutes');
const checkoutRoutes = require('./checkoutRoutes');

router.use('/', pageRoutes);
router.use('/products', productRoutes);
router.use('/checkout', checkoutRoutes);

module.exports = router;