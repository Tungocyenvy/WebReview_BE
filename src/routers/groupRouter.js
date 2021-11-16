const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const validate = require('../middleware/validator/index');
const groupValidate = require('../middleware/validator/groupValidate');

router.get('/getGroup', groupController.getGroup);
router.post(
  '/createGroup',
  validate.validateBody(groupValidate.create),
  groupController.createGroup,
);

router.put(
  '/getGroup/:Id',
  validate.validateBody(groupValidate.update),
  groupController.updateGroup,
);

router.delete('/getGroup/:Id', groupController.deleteGroup);

module.exports = router;
