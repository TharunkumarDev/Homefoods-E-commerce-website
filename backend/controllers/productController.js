const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/Product');

// @desc    Get all published products
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const { category, search, sort } = req.query;
  const query = { isPublished: true, isDeleted: false };
  
  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: 'i' };
  
  let sortQuery = { createdAt: -1 }; // newest
  if (sort === 'price_asc') sortQuery = { price: 1 };
  if (sort === 'price_desc') sortQuery = { price: -1 };
  if (sort === 'name_asc') sortQuery = { name: 1 };

  const products = await Product.find(query)
    .populate('category', 'name slug')
    .sort(sortQuery);
    
  res.status(200).json({ success: true, count: products.length, data: products });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name slug');
  if (!product || product.isDeleted || !product.isPublished) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.status(200).json({ success: true, data: product });
});

// --- ADMIN ROUTES ---

// @desc    Get all products (including drafts & deleted)
// @route   GET /api/admin/products
// @access  Admin
exports.getAdminProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isDeleted: false }).populate('category', 'name').sort('-createdAt');
  res.status(200).json({ success: true, count: products.length, data: products });
});

// @desc    Create new product
// @route   POST /api/admin/products
// @access  Admin
exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Admin
exports.updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product || product.isDeleted) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.status(200).json({ success: true, data: product });
});

// @desc    Delete product (soft delete)
// @route   DELETE /api/admin/products/:id
// @access  Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product || product.isDeleted) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  product.isDeleted = true;
  await product.save();
  res.status(200).json({ success: true, data: {} });
});

// @desc    Toggle publish status
// @route   PATCH /api/admin/products/:id/toggle
// @access  Admin
exports.togglePublishStatus = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product || product.isDeleted) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  product.isPublished = !product.isPublished;
  await product.save();
  res.status(200).json({ success: true, data: product });
});
