const express = require('express');
const router = express.Router();
const uploadImageController = require('../controllers/uploadImageController');

router.post('/upload', uploadImageController.uploadImagePost);

module.exports = router;
