const controller = require('./index');
const commentService = require('../services/CommentService');

const getComment = async (req, res, next) => {
  const postId = req.params.PostId;
  const resService = await commentService.GetComment({ PostId: postId });
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
    { AccountId: token },
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
    { AccountId: token },
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
    { AccountId: token },
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
    { AccountId: token },
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
  const idComment = req.params.id;
  //console.log(idComment);
  const resService = await commentService.DeleteComment(
    { AccountId: token },
    idComment,
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
  const idComment = req.params.idCmt;
  console.log(idComment);
  const idReply = req.params.id;
  console.log(idReply);
  const resService = await commentService.DeleteReply(
    { AccountId: token },
    idComment,
    idReply,
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
