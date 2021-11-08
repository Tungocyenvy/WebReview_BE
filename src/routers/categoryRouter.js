const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

//GroupId={RV, EXP, Forum}
router.get('/getCategory/:GroupId', categoryController.getCategory);

module.exports = router;
