const asyncHandler = require('../middleware/asyncHandler');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Helper to generate ORD-YYYYMMDD-XXXX
const generateOrderId = async () => {
  const date = new Date();
  const dateString = date.toISOString().slice(0, 10).replace(/-/g, '');
  
  // Find the last order of today
  const lastOrder = await Order.findOne({ orderId: new RegExp(`^ORD-${dateString}`) })
    .sort({ createdAt: -1 });

  let seq = 1;
  if (lastOrder) {
    const lastSeq = parseInt(lastOrder.orderId.split('-')[2]);
    seq = lastSeq + 1;
  }
  
  return `ORD-${dateString}-${seq.toString().padStart(4, '0')}`;
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
exports.createOrder = asyncHandler(async (req, res) => {
  const { customer, items, subtotal, deliveryCharge, grandTotal } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'No items in order' });
  }

  const orderId = await generateOrderId();

  const order = await Order.create({
    orderId,
    customer,
    items,
    subtotal,
    deliveryCharge,
    grandTotal,
  });

  // Optional: Update stock quantity
  // You may want to do this here or when order is confirmed
  
  res.status(201).json({ success: true, data: order });
});

// --- ADMIN ROUTES ---

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Admin
exports.getOrders = asyncHandler(async (req, res) => {
  const { status, search } = req.query;
  const query = {};

  if (status) query.status = status;
  if (search) {
    query.$or = [
      { orderId: { $regex: search, $options: 'i' } },
      { 'customer.name': { $regex: search, $options: 'i' } },
      { 'customer.phone': { $regex: search, $options: 'i' } }
    ];
  }

  const orders = await Order.find(query).sort('-createdAt');
  res.status(200).json({ success: true, count: orders.length, data: orders });
});

// @desc    Get single order
// @route   GET /api/admin/orders/:id
// @access  Admin
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.status(200).json({ success: true, data: order });
});

// @desc    Update order status
// @route   PATCH /api/admin/orders/:id
// @access  Admin
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ success: false, message: 'Status is required' });
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  res.status(200).json({ success: true, data: order });
});
