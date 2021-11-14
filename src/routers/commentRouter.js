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
router.get('/:PostId', commentController.getComment);
router.post('/update', jwt.verify, commentController.updateComment);
router.post('/updateReply', jwt.verify, commentController.updateReply);
router.delete('/delete/:id', jwt.verify, commentController.deleteComment);
router.delete(
  '/deleteReply/:idCmt/:id',
  jwt.verify,
  commentController.deleteReply,
);
//router.get('/deleteReply/:idCmt', jwt.verify, commentController.deleteReply);

module.exports = router;
