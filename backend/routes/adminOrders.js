const express = require('express');
const {
  getOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');

const router = express.Router();

router.route('/')
  .get(getOrders);

router.route('/:id')
  .get(getOrderById)
  .patch(updateOrderStatus);

module.exports = router;
