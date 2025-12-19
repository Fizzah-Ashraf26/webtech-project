const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const applyDiscount = require('../middlewares/applyDiscount');

/* =========================
   SAVE CHECKOUT DATA & PREVIEW
========================= */
router.post('/preview', applyDiscount, (req, res) => {
  const { customer, cart, paymentMethod } = req.body;

  if (!cart || !cart.length) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  // Save order data in session
  req.session.order = { customer, cart, paymentMethod };

  // Include discount info in session if applied
  if (req.discount) {
    req.session.order.discount = req.discount;
  }

  res.json({ success: true });
});

/* =========================
   ORDER PREVIEW PAGE
========================= */
router.get('/preview', (req, res) => {
  if (!req.session.order) return res.redirect('/cart');

  const order = req.session.order;

  // Calculate total (use discounted total if exists)
  let total = order.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (order.discount) total = order.discount.total;

  res.render('order-preview', {
    pageTitle: 'Order Preview',
    order,
    total
  });
});

/* =========================
   CONFIRM ORDER
========================= */
router.post('/confirm', applyDiscount, async (req, res) => {
  if (!req.session.order) return res.status(400).json({ success: false, error: 'No order in session' });

  try {
    const orderData = req.session.order;

    // Original total
    let total = orderData.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Apply discount if present
    let discountData = null;
    if (req.discount) {
      discountData = {
        coupon: req.discount.coupon,
        original: total,
        total: req.discount.total
      };
      total = req.discount.total; // store discounted total in DB
    }

    const order = new Order({
      customer: orderData.customer,
      items: orderData.cart,
      paymentMethod: orderData.paymentMethod,
      totalAmount: total,
      discount: discountData,
      status: 'Placed'
    });

    const savedOrder = await order.save();
    req.session.order = null; // clear session

    res.json({ success: true, orderId: savedOrder._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/* =========================
   ORDER SUCCESS PAGE
========================= */
router.get('/success/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.redirect('/');

    res.render('order-success', {
      pageTitle: 'Order Success',
      order
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

/* =========================
   VIEW CUSTOMER ORDERS
========================= */
router.get('/my-orders', (req, res) => {
  res.render('my-orders', {
    pageTitle: 'My Orders',
    orders: null,
    email: '',
    error: null
  });
});

router.post('/my-orders', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.render('my-orders', {
      pageTitle: 'My Orders',
      orders: null,
      email,
      error: 'Please enter your email'
    });
  }

  try {
    const orders = await Order.find({ 'customer.email': email }).sort({ createdAt: -1 });

    res.render('my-orders', {
      pageTitle: 'My Orders',
      orders,
      email,
      error: null
    });
  } catch (err) {
    console.error(err);
    res.render('my-orders', {
      pageTitle: 'My Orders',
      orders: null,
      email,
      error: 'Something went wrong'
    });
  }
});

module.exports = router;
