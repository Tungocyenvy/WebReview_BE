const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/accounts', adminController.getAccount);

router.get('/getPost/:GroupId', adminController.getPostFalse);

router.get(
  '/update/changeStatus/:GroupId/:PostId',
  adminController.updateStatusPost,
);
module.exports = router;
