const joi = require('@hapi/joi');

const validateBody = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body);
    if (validatorResult.error)
      return res.status(400).json(validatorResult.error.details[0].message);
    if (!req.value) req.value = {};
    if (!req.value['body']) req.value.body = {};
    req.value.body = { ...req.value.body, ...validatorResult.value };
    next();
  };
};

const validateParam = (schema, id) => {
  return (req, res, next) => {
    console.log(req.params);
    const validatorResult = schema.validate(req.params);
    if (validatorResult.error)
      return res.status(400).json(validatorResult.error.details[0].message);
    if (!req.value) req.value = {};
    if (!req.value['param']) req.value.param = {};
    req.value.param = validatorResult.value;
    next();
  };
};

const validate = {
  validateBody,
  validateParam,
};

module.exports = validate;
