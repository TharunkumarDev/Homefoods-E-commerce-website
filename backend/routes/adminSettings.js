const express = require('express');
const { updateSettings } = require('../controllers/settingController');

const router = express.Router();

router.put('/', updateSettings);

module.exports = router;
