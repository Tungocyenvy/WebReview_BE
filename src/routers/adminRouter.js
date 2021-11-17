const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/accounts', adminController.getAccount);

module.exports = router;
