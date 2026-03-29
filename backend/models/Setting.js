const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  businessName: {
    type: String,
    default: 'My Homemade Store',
  },
  logo: {
    url: String,
    publicId: String,
  },
  whatsappNumber: {
    type: String,
    required: true,
  },
  deliveryCharge: {
    type: Number,
    default: 0,
  },
  currencySymbol: {
    type: String,
    default: '₹',
  },
  aboutUs: String,
  socialLinks: {
    whatsapp: String,
    instagram: String,
    facebook: String,
    youtube: String,
  },
  minOrderAmount: {
    type: Number,
    default: 0,
  },
  announcement: {
    text: String,
    isActive: { type: Boolean, default: false },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Setting', settingSchema);
