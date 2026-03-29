const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  image: {
    url: { type: String, required: true },
    publicId: String,
  },
  title: String,
  subtitle: String,
  linkUrl: String,
  displayOrder: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Banner', bannerSchema);
