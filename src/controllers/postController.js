const controller = require('./index');
const postService = require('../services/PostService');

//REVIEW
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
const getReviewbyCategory = async (req, res, next) => {
  const id = req.params.CategoryId;
  const resService = await postService.getReviewbyCategory({ CategoryId: id });
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

const getExpbyCategory = async (req, res, next) => {
  const id = req.params.CategoryId;
  const resService = await postService.getEXPbyCategory({ CategoryId: id });
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

const getForumbyCategory = async (req, res, next) => {
  const id = req.params.CategoryId;
  const resService = await postService.getForumbyCategory({ CategoryId: id });
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
  getReviewbyCategory,
  getExpbyCategory,
  getForumbyCategory,
};
