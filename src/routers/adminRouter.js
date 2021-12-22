const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/accounts', adminController.getAccount);
router.delete('/deleteAccount/:AccountId', adminController.deleteAccount);

router.get('/getPost/:GroupId', adminController.getPostFalse);

router.put(
  '/update/changeStatus/:GroupId/:PostId',
  adminController.updateStatusPost,
);

router.get('/getPost/:GroupId/:PostId', adminController.getDetailPost);

router.delete('/deletePost/:GroupId/:PostId', adminController.detetePost);

router.get('/getComment', adminController.getComment);
module.exports = router;
