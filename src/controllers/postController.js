const controller = require('./index');
const postService = require('../services/PostService');

//Lấy bài viết cho các trang
const getPostbyGroupId = async (req, res, next) => {
  const token = req.value.body.token.data;
  const id = req.params.GroupId;
  const resService = await postService.getPostbyGroupId({
    GroupId: id,
    Email: token,
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
  const token = req.value.body.token.data;
  const id = req.params.GroupId;
  const cate = req.params.CategoryId;
  const resService = await postService.getPostbyCategory({
    GroupId: id,
    Email: token,
    CategoryId: cate,
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
    Email: token,
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

module.exports = {
  getPostbyGroupId,
  getPost,
  getPostbyCategory,
  searchPost,
};
