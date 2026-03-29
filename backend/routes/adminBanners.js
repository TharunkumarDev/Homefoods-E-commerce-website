const express = require('express');
const {
  getAdminBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  reorderBanners
} = require('../controllers/bannerController');

const router = express.Router();

router.route('/')
  .get(getAdminBanners)
  .post(createBanner);

router.patch('/reorder', reorderBanners);

router.route('/:id')
  .put(updateBanner)
  .delete(deleteBanner);

module.exports = router;
