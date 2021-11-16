const joi = require('@hapi/joi');

const SchemaAccount = {
  create: joi.object().keys({
    GroupId: joi.string().required(),
    CateName: joi.string().required(),
  }),
  update: joi.object().keys({
    GroupId: joi.string().required(),
    CateName: joi.string().required(),
  }),
};

module.exports = SchemaAccount;
