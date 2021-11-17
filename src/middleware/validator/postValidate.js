const joi = require('@hapi/joi');

const SchemaAccount = {
  update: joi.object().keys({
    Id: joi.string(),
    Title: joi.string(),
    Image: joi.string(),
    Overview: joi.string(),
    Content: joi.string(),
    AccountId: joi.string(),
    CategoryId: joi.string(),
    Status: joi.boolean(),
    IsShow: joi.boolean(),
    CreateAt: joi.date(),
  }),
  create: joi.object().keys({
    GroupId: joi.string(),
    Title: joi.string(),
    Image: joi.string(),
    Overview: joi.string(),
    Content: joi.string(),
    CategoryId: joi.string(),
  }),
};

module.exports = SchemaAccount;
