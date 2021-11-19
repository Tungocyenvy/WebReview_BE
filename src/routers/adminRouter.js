const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/accounts', adminController.getAccount);

router.get('/getPost/:GroupId', adminController.getPostFalse);

router.put(
  '/update/changeStatus/:GroupId/:PostId',
  adminController.updateStatusPost,
);

router.get('/getPost/:GroupId/:PostId', adminController.getDetailPost);

module.exports = router;
