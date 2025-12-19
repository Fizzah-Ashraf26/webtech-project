const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// Products listing page with pagination and filters
router.get('/', async (req, res) => {
  try {
    // Get query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const category = req.query.category || '';
    const search = req.query.search || '';
    const sort = req.query.sort || 'name';
    const inStock = req.query.inStock || 'false';

    // Build filter object
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    // Filter for in-stock products only
    if (inStock === 'true') {
      filter.stock = { $gt: 0 };
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build sort object
    let sortObj = {};
    switch(sort) {
      case 'price-asc':
        sortObj = { price: 1 };
        break;
      case 'price-desc':
        sortObj = { price: -1 };
        break;
      case 'name':
        sortObj = { name: 1 };
        break;
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      default:
        sortObj = { name: 1 };
    }

    // Fetch products with filters, pagination, and sorting
    const products = await Product.find(filter)
      .sort(sortObj)
      .limit(limit)
      .skip(skip);

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    res.render('products', {
      pageTitle: 'Our Products - Flower',
      currentPage: 'products',
      products,
      currentPage: page,
      totalPages,
      limit,
      totalProducts,
      filters: {
        category,
        search,
        sort,
        inStock
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).render('error', {
      pageTitle: 'Error',
      message: 'Error loading products'
    });
  }
});

// Single product view
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).render('404', {
        pageTitle: '404 - Product Not Found',
        currentPage: 'error'
      });
    }

    res.render('productDetails', {
      pageTitle: `${product.name} - Flower`,
      currentPage: 'products',
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).render('error', {
      pageTitle: 'Error',
      message: 'Error loading product'
    });
  }
});

module.exports = router;