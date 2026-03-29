const express = require('express');
const {
  getProducts,
  getProduct,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  togglePublishStatus
} = require('../controllers/productController');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

module.exports = router;
