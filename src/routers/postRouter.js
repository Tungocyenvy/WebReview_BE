const express = require('express');
const router = express.Router();
const jwt = require('../services/jwtService');
const postController = require('../controllers/postController');

//Review
router.get('/review/getPost', postController.getReview);
router.get('/review/getPost/:CategoryId', postController.getReviewbyCategory);

//Experience
router.get('/experience/getPost', postController.getExperience);
router.get('/experience/getPost/:CategoryId', postController.getExpbyCategory);

//forum
router.get('/forum/getPost', postController.getForum);
router.get('/forum/getPost/:CategoryId', postController.getForumbyCategory);

module.exports = router;
