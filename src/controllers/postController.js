const controller = require('./index');
const postService = require('../services/PostService');

//REVIEW
const getReview = async (req, res, next) => {
  const token = req.value.body.token.data;
  const resService = await postService.getReview({ Email: token });
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
  const token = req.value.body.token.data;
  const id = req.params.CategoryId;
  const resService = await postService.getReviewbyCategory({
    Email: token,
    CategoryId: id,
  });
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
  const token = req.value.body.token.data;
  const resService = await postService.getExperience({ Email: token });
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
  const token = req.value.body.token.data;
  const id = req.params.CategoryId;
  const resService = await postService.getEXPbyCategory({
    Email: token,
    CategoryId: id,
  });
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
  const token = req.value.body.token.data;
  const resService = await postService.getForum({ Email: token });
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
  const token = req.value.body.token.data;
  const id = req.params.CategoryId;
  const resService = await postService.getForumbyCategory({
    Email: token,
    CategoryId: id,
  });
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
