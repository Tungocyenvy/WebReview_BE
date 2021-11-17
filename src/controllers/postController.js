const controller = require('./index');
const postService = require('../services/PostService');

//Lấy bài viết cho các trang
const getPostbyGroupId = async (req, res, next) => {
  const token = req.value.body.token.data;
  const id = req.params.GroupId;
  const resService = await postService.getPostbyGroupId({
    AccountId: token,
    GroupId: id,
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

//Lấy bài viết theo loại
const getPostbyCategory = async (req, res, next) => {
  const AccountId = req.value.body.token.data;
  const GroupId = req.params.GroupId;
  const CategoryId = req.params.CategoryId;
  console.log('ahihih');
  console.log(GroupId);
  const resService = await postService.getPostbyCategory({
    AccountId,
    GroupId,
    CategoryId,
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

//Lấy top các bài viết cho trang index
const getPost = async (req, res, next) => {
  const token = req.value.body.token.data;
  const resService = await postService.getPost({
    AccountId: token,
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

const searchPost = async (req, res, next) => {
  const resService = await postService.searchPost(req);
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

const updatePost = async (req, res, next) => {
  // const TokenID = req.value.body.token?.data;
  const GroupId = req.params.GroupId;
  const PostId = req.params.PostId;
  const AccountId = req.value.body.token.data;
  const data = req.body;
  //const { token, ...data } = req.value.body;
  const resService = await postService.updatePost({
    AccountId,
    data,
    GroupId,
    PostId,
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
  const TokenID = req.value.body.token;
  const GroupId = req.params.GroupId;
  const PostId = req.params.PostId;
  const resService = await postService.getDetailPost({
    TokenID,
    GroupId,
    PostId,
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

const createPost = async (req, res, next) => {
  const AccountId = req.value.body.token;
  const resService = await postService.createPost(AccountId, req.body);
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
  getPostbyGroupId,
  getPost,
  getPostbyCategory,
  searchPost,
  updatePost,
  getDetailPost,
  createPost,
};
