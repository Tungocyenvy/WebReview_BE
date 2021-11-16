const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const validate = require('../middleware/validator/index');
const categoryValidate = require('../middleware/validator/categoryValidate');

//GroupId={RV, EXP, Forum}
router.get('/getCategory/:GroupId', categoryController.getCategorybyGroupId);

router.get('/getCategory', categoryController.getCategory);

router.post(
  '/createCategory',
  validate.validateBody(categoryValidate.create),
  categoryController.createCategory,
);

router.put(
  '/getCategory/:CateId',
  validate.validateBody(categoryValidate.update),
  categoryController.updateCategory,
);
router.post('/getCategory/:CateId', categoryController.deleteCategory);

module.exports = router;
