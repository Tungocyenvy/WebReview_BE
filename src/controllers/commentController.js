const controller = require('./index');
const commentService = require('../services/CommentService');

const getComment = async (req, res, next) => {
  const resService = await commentService.GetComment();
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

const postComment = async (req, res, next) => {
  const token = req.value.body.token.data;
  const resService = await commentService.PostComment(
    { Email: token },
    req.body,
  );

  if (resService.statusCode === 200 || resService.statusCode === 201)
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const replyComment = async (req, res, next) => {
  const token = req.value.body.token.data;
  const resService = await commentService.ReplyComment(
    { Email: token },
    req.body,
  );

  if (resService.statusCode === 200 || resService.statusCode === 201)
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const updateComment = async (req, res, next) => {
  const token = req.value.body.token.data;
  const resService = await commentService.UpdateComment(
    { Email: token },
    req.body,
  );

  if (resService.statusCode === 200 || resService.statusCode === 201)
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const updateReply = async (req, res, next) => {
  const token = req.value.body.token.data;
  const resService = await commentService.UpdateReply(
    { Email: token },
    req.body,
  );

  if (resService.statusCode === 200 || resService.statusCode === 201)
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const deleteComment = async (req, res, next) => {
  const token = req.value.body.token.data;
  const resService = await commentService.DeleteComment(
    { Email: token },
    req.body,
  );

  if (resService.statusCode === 200 || resService.statusCode === 201)
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const deleteReply = async (req, res, next) => {
  const token = req.value.body.token.data;
  const resService = await commentService.DeleteReply(
    { Email: token },
    req.body,
  );

  if (resService.statusCode === 200 || resService.statusCode === 201)
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

module.exports = {
  postComment,
  replyComment,
  getComment,
  updateComment,
  updateReply,
  deleteComment,
  deleteReply,
};
