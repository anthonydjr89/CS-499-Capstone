const express = require('express');
const router = express.Router();

// Example controller imports
const ctrlMain = require('../controllers/main');

// Define routes
router.get('/', ctrlMain.index);
router.get('/travel', ctrlMain.travel);

module.exports = router;
