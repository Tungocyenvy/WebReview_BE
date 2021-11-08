const express = require('express');
const router = express.Router();
const jwt = require('../services/jwtService');
const postController = require('../controllers/postController');

router.get('/getPost', jwt.verify, postController.getPost);

//GroupId={Review, Experience, Forum}
router.get('/getPost/:GroupId', jwt.verify, postController.getPostbyGroupId);

router.get(
  '/getPost/:GroupId/:CategoryId',
  jwt.verify,
  postController.getPostbyCategory,
);

module.exports = router;
