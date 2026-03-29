const asyncHandler = require('../middleware/asyncHandler');
const Banner = require('../models/Banner');

// @desc    Get all active banners
// @route   GET /api/banners
// @access  Public
exports.getBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({ isActive: true }).sort('displayOrder');
  res.status(200).json({ success: true, count: banners.length, data: banners });
});

// --- ADMIN ROUTES ---

// @desc    Get all banners (including inactive)
// @route   GET /api/admin/banners
// @access  Admin
exports.getAdminBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find().sort('displayOrder');
  res.status(200).json({ success: true, count: banners.length, data: banners });
});

// @desc    Create new banner
// @route   POST /api/admin/banners
// @access  Admin
exports.createBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.create(req.body);
  res.status(201).json({ success: true, data: banner });
});

// @desc    Update banner
// @route   PUT /api/admin/banners/:id
// @access  Admin
exports.updateBanner = asyncHandler(async (req, res) => {
  let banner = await Banner.findById(req.params.id);
  if (!banner) {
    return res.status(404).json({ success: false, message: 'Banner not found' });
  }
  banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.status(200).json({ success: true, data: banner });
});

// @desc    Delete banner
// @route   DELETE /api/admin/banners/:id
// @access  Admin
exports.deleteBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);
  if (!banner) {
    return res.status(404).json({ success: false, message: 'Banner not found' });
  }
  await banner.deleteOne();
  res.status(200).json({ success: true, data: {} });
});

// @desc    Reorder banners
// @route   PATCH /api/admin/banners/reorder
// @access  Admin
exports.reorderBanners = asyncHandler(async (req, res) => {
  const { banners: newOrder } = req.body; // Array of { id, displayOrder }
  if (newOrder && Array.isArray(newOrder)) {
    const promises = newOrder.map((item) => 
      Banner.findByIdAndUpdate(item.id, { displayOrder: item.displayOrder })
    );
    await Promise.all(promises);
  }
  const banners = await Banner.find().sort('displayOrder');
  res.status(200).json({ success: true, data: banners });
});
