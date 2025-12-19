const session = require('express-session');

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/flowerdatabase');
const Product = require('./models/products');


const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
  secret: 'order-secret-key',
  resave: false,
  saveUninitialized: false
}));

const indexRoutes = require('./routes/indexRoutes');       
const checkoutRoutes = require('./routes/checkoutRoutes');
const crudRoutes = require('./routes/crudRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/orderRoutes');


// Use routes
app.use('/', indexRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/crud', crudRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/admin', adminRoutes);
app.use('/order', orderRoutes);



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

app.use(session({
  secret: 'order-secret-key',  // already done
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 30 } // 30 min session
}));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}/admin`);
});