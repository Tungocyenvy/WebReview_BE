const express = require('express');
const router = express.Router();
const jwt = require('../services/jwtService');
const postController = require('../controllers/postController');

const validate = require('../middleware/validator/index');
const accountValidate = require('../middleware/validator/accountValidate');

//Review
router.get('/review/getPost', postController.getReview);

//Experience
router.get('/experience/getPost', postController.getExperience);

module.exports = router;
