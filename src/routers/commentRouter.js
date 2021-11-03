const express = require('express');
const router = express.Router();
const jwt = require('../services/jwtService');
const commentController = require('../controllers/commentController');
const validate = require('../middleware/validator/index');
const commentValidate = require('../middleware/validator/commentValidate');

router.post(
  '/posts',
  validate.validateBody(commentValidate.postComment),
  jwt.verify,
  commentController.postComment,
);
router.post('/reply', jwt.verify, commentController.replyComment);
//router.get('/',commentController.getComment);

module.exports = router;
