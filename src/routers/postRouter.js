const express = require('express');
const router = express.Router();
const jwt = require('../services/jwtService');
const postController = require('../controllers/postController');

//Review
router.get('/review/getPost', jwt.verify, postController.getReview);
router.get(
  '/review/getPost/:CategoryId',
  jwt.verify,
  postController.getReviewbyCategory,
);

//Experience

router.get('/experience/getPost', jwt.verify, postController.getExperience);
router.get(
  '/experience/getPost/:CategoryId',
  jwt.verify,
  postController.getExpbyCategory,
);

//forum
router.get('/forum/getPost', jwt.verify, postController.getForum);
router.get(
  '/forum/getPost/:CategoryId',
  jwt.verify,
  postController.getForumbyCategory,
);

module.exports = router;
