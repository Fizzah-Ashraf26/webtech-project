const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'Flower - Premium Flower Bouquets',
    currentPage: 'home'
  });
});

app.get('/checkout', (req, res) => {
  res.render('checkout', {
    pageTitle: 'Checkout - Flower',
    currentPage: 'checkout'
  });
});

app.post('/checkout', (req, res) => {
  const orderData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    postal: req.body.postal,
    country: req.body.country,
    paymentMethod: req.body.payment
  };

  console.log('Order received:', orderData);

  res.redirect('/orderplaced');
});

app.get('/crud', (req, res) => {
  res.render('crud', {
    pageTitle: 'CRUD App - Flower',
    currentPage: 'crud'
  });
});

app.get('/orderplaced', (req, res) => {
  res.render('orderplaced', {
    pageTitle: 'Order Success - Flower',
    currentPage: 'orderplaced'
  });
});

app.get('/about', (req, res) => {
  res.redirect('/#about');
});

app.get('/gallery', (req, res) => {
  res.redirect('/#gallery');
});

app.get('/contact', (req, res) => {
  res.redirect('/#footer');
});

app.get('/crud/api/posts', (req, res) => {
  res.json({ message: 'Use client-side fetch to jsonplaceholder.typicode.com' });
});

app.use((req, res) => {
  res.status(404).render('404', {
    pageTitle: '404 - Page Not Found',
    currentPage: 'error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});