const express = require('express');
const router = express.Router();
const jwt = require('../services/jwtService');
const commentController = require('../controllers/commentController');

router.post('/posts', jwt.verify, commentController.postComment);
router.post('/reply', jwt.verify, commentController.replyComment);

module.exports = router;
