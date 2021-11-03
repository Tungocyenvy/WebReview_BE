const controller = require('./index');
const postService = require('../services/PostService');

const getReview = async (req, res, next) => {
  const resService = await postService.getReview();
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

const getExperience = async (req, res, next) => {
  const resService = await postService.getExperience();
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

const getForum = async (req, res, next) => {
  const resService = await postService.getForum();
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
