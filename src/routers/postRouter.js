const express = require('express');
const router = express.Router();
const jwt = require('../services/jwtService');
const postController = require('../controllers/postController');
const validate = require('../middleware/validator/index');
const postValidate = require('../middleware/validator/postValidate');

router.get('/getPost', jwt.verify, postController.getPost);

//Lấy bài viết theo groupId
//GroupId={Review, Experience, Forum}
router.get('/getPost/:GroupId', jwt.verify, postController.getPostbyGroupId);

//Lấy chi tiết bài viết
router.get(
  '/getPost/detail/:GroupId/:PostId',
  jwt.verify,
  postController.getDetailPost,
);

//Lấy bài viết theo category
router.get(
  '/getPost/:GroupId/:CategoryId',
  jwt.verify,
  postController.getPostbyCategory,
);

//Chỉnh sửa bài viết
router.post(
  '/updatePost/:GroupId/:PostId',
  jwt.verify,
  validate.validateBody(postValidate.update),
  postController.updatePost,
);

//Tạo bài viết
router.post(
  '/createPost',
  jwt.verify,
  validate.validateBody(postValidate.create),
  postController.createPost,
);

//Lấy bài viết theo status
router.get(
  '/manage/getPost/:Status',
  jwt.verify,
  postController.getPostbyStatus,
);

//search
router.get('/searchPost', postController.searchPost);
module.exports = router;
