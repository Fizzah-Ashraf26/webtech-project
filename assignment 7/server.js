
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/flowerdatabase');
const Product = require('./models/products');


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


const indexRoutes = require('./routes/indexRoutes');       // or './routes/index route.js'
const checkoutRoutes = require('./routes/checkoutRoutes');
const crudRoutes = require('./routes/crudRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/admin');



// Use routes
app.use('/', indexRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/crud', crudRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/admin', adminRoutes);


// 404 Error handler - Must be last
app.use((req, res) => {
  res.status(404).render('404', {
    pageTitle: '404 - Page Not Found',
    currentPage: 'error'
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).render('error', {
    pageTitle: 'Error',
    message: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}/admin`);
});