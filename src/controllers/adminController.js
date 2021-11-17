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

module.exports = { getAccount };
