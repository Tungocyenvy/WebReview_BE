const joi = require('@hapi/joi');

const SchemaAccount = {
  postComment: joi.object().keys({
    Content: joi.string().required(),
    PostId: joi.string().required(),
  }),
};

module.exports = SchemaAccount;
