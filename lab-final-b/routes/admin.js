const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const Order = require('../models/Order');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ===== Multer Storage Setup for Product Images =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../public/images');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ===== DASHBOARD =====
router.get('/', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const lowStock = await Product.countDocuments({ stock: { $lt: 10 } });
    const outOfStock = await Product.countDocuments({ stock: 0 });
    const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5);

    res.render('admin/dashboard', {
      pageTitle: 'Dashboard',
      currentPage: 'dashboard',
      stats: { totalProducts, lowStock, outOfStock },
      recentProducts
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).send('Dashboard error: ' + error.message);
  }
});

// ===== PRODUCT ROUTES =====
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('admin/products', {
      pageTitle: 'Products',
      currentPage: 'products',
      products,
      totalProducts: products.length
    });
  } catch (error) {
    console.error('Products error:', error);
    res.status(500).send('Products error: ' + error.message);
  }
});

router.get('/products/add', (req, res) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    currentPage: 'add-product',
    product: null,
    error: null,
    categories: ['Bouquets', 'Roses', 'Lillies', 'Orchids', 'Mixed', 'Daisies', 'Sunflowers']
  });
});

router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: parseFloat(req.body.price),
      category: req.body.category,
      stock: parseInt(req.body.stock),
      description: req.body.description,
      image: req.file ? req.file.filename : '',
      rating: parseFloat(req.body.rating) || 0
    });
    await product.save();
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Create error:', error);
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      currentPage: 'add-product',
      product: req.body,
      error: error.message,
      categories: ['Bouquets', 'Roses', 'Lillies', 'Orchids', 'Mixed', 'Daisies', 'Sunflowers']
    });
  }
});

router.get('/products/:id/edit', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.render('admin/add-product', {
      pageTitle: 'Edit Product',
      currentPage: 'add-product',
      product,
      error: null,
      categories: ['Bouquets', 'Roses', 'Lillies', 'Orchids', 'Mixed', 'Daisies', 'Sunflowers']
    });
  } catch (error) {
    console.error('Edit error:', error);
    res.status(500).send('Edit error: ' + error.message);
  }
});

router.post('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: parseFloat(req.body.price),
      category: req.body.category,
      stock: parseInt(req.body.stock),
      description: req.body.description,
      rating: parseFloat(req.body.rating) || 0
    };
    if (req.file) updateData.image = req.file.filename;

    await Product.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/admin/products');
  } catch (error) {
    const product = await Product.findById(req.params.id);
    res.render('admin/add-product', {
      pageTitle: 'Edit Product',
      currentPage: 'add-product',
      product: { ...product.toObject(), ...req.body },
      error: error.message,
      categories: ['Bouquets', 'Roses', 'Lillies', 'Orchids', 'Mixed', 'Daisies', 'Sunflowers']
    });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== ORDER MANAGEMENT ROUTES =====

// Middleware to prevent skipping order states
function validateStatusTransition(req, res, next) {
  const { newStatus } = req.body;
  const allowedTransitions = {
    Placed: ['Processing'],
    Processing: ['Delivered'],
    Delivered: []
  };

  Order.findById(req.params.id)
    .then(order => {
      if (!order) return res.status(404).send('Order not found');
      const allowedNext = allowedTransitions[order.status];
      if (!allowedNext.includes(newStatus)) {
        return res.status(400).send(`Invalid status transition from ${order.status} to ${newStatus}`);
      }
      req.order = order;
      next();
    })
    .catch(err => res.status(500).send('Server error'));
}

// Admin view all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.render('admin-orders', { orders, pageTitle: 'All Orders' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update order status
router.post('/orders/:id/status', validateStatusTransition, async (req, res) => {
  try {
    const { newStatus } = req.body;
    req.order.status = newStatus;
    await req.order.save();
    res.redirect('/admin/orders');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
