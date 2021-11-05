const controller = require('./index');
const categoryService = require('../services/CategoryService');

//REVIEW
const getReview = async (req, res, next) => {
  const resService = await categoryService.getReview();
  if (resService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  }
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

//EXPERIENCE
const getExperience = async (req, res, next) => {
  const resService = await categoryService.getExperience();
  if (resService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  }
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

//FORUM
const getForum = async (req, res, next) => {
  const resService = await categoryService.getForum();
  if (resService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  }
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

module.exports = {
  getReview,
  getExperience,
  getForum,
};
