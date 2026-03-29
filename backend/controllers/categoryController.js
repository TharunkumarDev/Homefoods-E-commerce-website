const asyncHandler = require('../middleware/asyncHandler');
const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort('displayOrder');
  res.status(200).json({ success: true, count: categories.length, data: categories });
});

// @desc    Create new category
// @route   POST /api/admin/categories
// @access  Admin
exports.createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, data: category });
});

// @desc    Update category
// @route   PUT /api/admin/categories/:id
// @access  Admin
exports.updateCategory = asyncHandler(async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.status(200).json({ success: true, data: category });
});

// @desc    Delete category
// @route   DELETE /api/admin/categories/:id
// @access  Admin
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  // Optional: Check if products exist in category before deleting
  await category.deleteOne();
  res.status(200).json({ success: true, data: {} });
});
