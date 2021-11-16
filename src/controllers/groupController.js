const controller = require('./index');
const groupService = require('../services/GroupService');

//Lấy bài viết theo loại
// const getCategorybyGroupId = async (req, res, next) => {
//   const id = req.params.GroupId;
//   const resService = await categoryService.getCategorybyGroupId({
//     GroupId: id,
//   });
//   if (resService.statusCode === 200) {
//     return controller.sendSuccess(
//       res,
//       resService.data,
//       resService.statusCode,
//       resService.msg,
//     );
//   }
//   return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
// };

const getGroup = async (req, res, next) => {
  const resService = await groupService.getGroup();
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

const createGroup = async (req, res, next) => {
  const resService = await groupService.createGroup(req.body);
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

const updateGroup = async (req, res, next) => {
  const Id = req.params.Id;
  const Name = req.body;
  const resService = await groupService.updateGroup(Name, Id);
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

const changeStatusGroup = async (req, res, next) => {
  const Id = req.params.Id;
  const resService = await groupService.changeStatusGroup(Id);
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
/**Bỏ delete */
// const deleteGroup = async (req, res, next) => {
//   const Id = req.params.Id;
//   const resService = await groupService.deleteGroup(Id);
//   if (resService.statusCode === 200) {
//     return controller.sendSuccess(
//       res,
//       resService.data,
//       resService.statusCode,
//       resService.msg,
//     );
//   }
//   return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
// };

module.exports = {
  getGroup,
  createGroup,
  updateGroup,
  changeStatusGroup,
};
