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
  // changepassword: joi.object().keys({
  //   Password: joi.string().required(),
  //   NewPassword: joi.string().required(),
  //   ConfirmPassword: joi.string().required(),
  // }),
  // updatecustomer: joi.object().keys({
  //   FirstName: joi.string(),
  //   LastName: joi.string(),
  //   Phone: joi.string(),
  // }),
};

module.exports = SchemaAccount;
