const controller = require('./index');
const categoryService = require('../services/CategoryService');

//Lấy bài viết theo loại
const getCategory = async (req, res, next) => {
  const id = req.params.GroupId;
  const resService = await categoryService.getCategory({
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

module.exports = {
  getCategory,
};
