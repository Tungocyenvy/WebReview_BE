const express = require('express');
const router = express.Router();
const jwt = require('../services/jwtService');
const accountController = require('../controllers/accountController');

const validate = require('../middleware/validator/index');
const accountValidate = require('../middleware/validator/accountValidate');

router.post(
  '/signup',
  validate.validateBody(accountValidate.signup),
  accountController.signup,
);

router.post('/signin', accountController.signin);

router.post(
  '/forgotPassword',
  validate.validateBody(accountValidate.forgetpassword),
  accountController.forgotPassword,
);

router.post(
  '/changePassword',
  validate.validateBody(accountValidate.changepassword),
  jwt.verify,
  accountController.changePassword,
);

router.get('/getUser', jwt.verify, accountController.getDataUSer);

router.post(
  '/updateUser',
  jwt.verify,
  validate.validateBody(accountValidate.updateuser),
  accountController.updateUser,
);
// api này để thiên test thôi
router.get('/testGetUser', accountController.getTestDataUSer);

module.exports = router;
