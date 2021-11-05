const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

//Review
router.get('/review/getCategory', categoryController.getReview);

//Experience
router.get('/experience/getCategory', categoryController.getExperience);

//forum
router.get('/forum/getCategory', categoryController.getForum);

module.exports = router;
