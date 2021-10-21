const express = require('express');
const router = express.Router();
const jwt = require('../services/jwtService');
const accountController = require('../controllers/accountController');

const validate = require('../middleware/validator/index');
const accountValidate = require('../middleware/validator/accountValidate');

router.post(
  '/signup',
  validate.validateBody(accountValidate.SchemaAccount.signup),
  accountController.signup,
);

router.post('/signin', accountController.signin);

module.exports = router;
