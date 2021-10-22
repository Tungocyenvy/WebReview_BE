const controller = require('./index');
const accountService = require('../services/AccountService');

const signup = async (req, res, next) => {
  const resService = await accountService.SignupService(req.body);
  if (resService.statusCode === 200 || resService.statusCode === 201)
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const signin = async (req, res, next) => {
  const resService = await accountService.SigninService(req.body);
  if (resService.statusCode === 200 || resService.statusCode === 201)
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const forgotPassword = async (req, res, next) => {
  const resService = await accountService.ForgetPasswordService(req.body);
  if (resService.statusCode === 200 || resService.statusCode === 201)
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const changePassword = async (req, res, next) => {
  const tokenID = req.value.body.token.data;
  console.log(req.value.body.token.data);
  const resService = await accountService.ChangePasswordService(
    tokenID,
    req.body,
  );
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

module.exports = { signup, signin, forgotPassword, changePassword };
