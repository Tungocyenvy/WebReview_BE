const joi = require('@hapi/joi');

const SchemaAccount = {
  create: joi.object().keys({
    Id: joi.string().required(),
    Name: joi.string().required(),
  }),
  update: joi.object().keys({
    Name: joi.string().required(),
  }),
};

module.exports = SchemaAccount;
