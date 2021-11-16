const express = require('express');
const router = express.Router();
const jwt = require('../services/jwtService');
const postController = require('../controllers/postController');
const validate = require('../middleware/validator/index');
const postValidate = require('../middleware/validator/postValidate');

router.get('/getPost', jwt.verify, postController.getPost);

//GroupId={Review, Experience, Forum}
router.get('/getPost/:GroupId', jwt.verify, postController.getPostbyGroupId);

router.get(
  '/getPost/:GroupId/:PostId',
  jwt.verify,
  postController.getDetailPost,
);

router.get(
  '/getPost/:GroupId/:CategoryId',
  jwt.verify,
  postController.getPostbyCategory,
);

router.post(
  '/updatePost/:GroupId/:PostId',
  jwt.verify,
  validate.validateBody(postValidate.update),
  postController.updatePost,
);

//search
router.get('/searchPost', postController.searchPost);
module.exports = router;
