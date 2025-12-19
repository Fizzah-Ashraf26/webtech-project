
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


const indexRoutes = require('./routes/indexRoutes');       
const checkoutRoutes = require('./routes/checkoutRoutes');
const crudRoutes = require('./routes/crudRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/', indexRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/crud', crudRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.use((req, res) => {
  res.status(404).render('404', {
    pageTitle: '404 - Page Not Found',
    currentPage: 'error'
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).render('error', {
    pageTitle: 'Error',
    message: 'Something went wrong!'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});

