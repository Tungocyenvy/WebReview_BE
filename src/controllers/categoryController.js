const controller = require('./index');
const categoryService = require('../services/CategoryService');

//Lấy bài viết theo loại
const getCategorybyGroupId = async (req, res, next) => {
  const id = req.params.GroupId;
  const resService = await categoryService.getCategorybyGroupId({
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

//Lấy tất cả bài viết
const getCategory = async (req, res, next) => {
  const resService = await categoryService.getCategory();
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

const createCategory = async (req, res, next) => {
  const resService = await categoryService.createCategory(req.body);
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

const updateCategory = async (req, res, next) => {
  const CateId = req.params.CateId;
  const resService = await categoryService.updateCategory(req.body, CateId);
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

const deleteCategory = async (req, res, next) => {
  const CateId = req.params.CateId;
  const resService = await categoryService.deleteCategory(req.body, CateId);
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
  getCategorybyGroupId,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
