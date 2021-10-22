const joi = require('@hapi/joi');

const SchemaAccount = {
  signup: joi.object().keys({
    UserName: joi.string().required(),
    PassWord: joi.string().min(6).required(),
    Email: joi.string().email().required(),
    FullName: joi.string().required(),
    DOB: joi.string(),
    Address: joi.string(),
  }),
  forgetpassword: joi.object().keys({
    Email: joi.string().email().required(),
  }),
  changepassword: joi.object().keys({
    PassWord: joi.string().min(6).required(),
    NewPassword: joi.string().min(6).required(),
    ConfirmPassword: joi.string().min(6).required(),
  }),
  updateuser: joi.object().keys({
    FullName: joi.string().required(),
    DOB: joi.string(),
    Address: joi.string(),
  }),
};

module.exports = SchemaAccount;
