const controller = require('./index');
const adminService = require('../services/AdminService');

const getAccount = async (req, res, next) => {
  const resService = await adminService.GetAccount();
  if (resService.statusCode === 200 || resService.statusCode === 201)
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const getPostFalse = async (req, res, next) => {
  const groupId = req.params.GroupId;
  const resService = await adminService.GetPostFalse({ GroupId: groupId });
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

const updateStatusPost = async (req, res, next) => {
  const groupId = req.params.GroupId;
  const postId = req.params.PostId;
  const resService = await adminService.UpdateStatusPost({
    GroupId: groupId,
    PostId: postId,
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

const getDetailPost = async (req, res, next) => {
  const GroupId = req.params.GroupId;
  const PostId = req.params.PostId;
  const resService = await adminService.getDetailPost({ GroupId, PostId });
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

module.exports = { getAccount, getPostFalse, updateStatusPost, getDetailPost };
