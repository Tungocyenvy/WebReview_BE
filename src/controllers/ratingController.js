const controller = require('./index');
const ratingService = require('../services/RatingService');

const createRating = async (req, res, next) => {
  const AccountId = req.value.body.token.data;
  const PostId = req.params.PostId;
  const Rate = req.body;
  const resService = await ratingService.createRating(AccountId, PostId, Rate);
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

const updateRating = async (req, res, next) => {
  const AccountId = req.value.body.token.data;
  const PostId = req.params.PostId;
  const Rate = req.body;
  const resService = await ratingService.updateRating(AccountId, PostId, Rate);
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
  createRating,
  updateRating,
};
