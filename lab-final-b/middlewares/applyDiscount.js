// middlewares/applyDiscount.js
function applyDiscount(req, res, next) {
  const coupon = req.body.couponCode || req.query.couponCode;

  if (coupon === 'SAVE10' && req.body.cart) {
    // Calculate original total
    const total = req.body.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Apply 10% discount
    const discountAmount = total * 0.10;
    const discountedTotal = total - discountAmount;

    // Store discount info in request for later use
  req.discount = {
  coupon: 'SAVE10',
  original: total,
  total: discountedTotal
};

  }

  next();
}

module.exports = applyDiscount;
