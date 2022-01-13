const sendSuccess = (res, data, statusCode = 200, msg = 'successfully') => {
  return res.status(statusCode).json({
    msg: msg,
    data: data,
    success: statusCode,
  });
};
const sendError = (res, statusCode = 500, msg = 'Server not respone') => {
  return res.status(statusCode).json({
    msg: msg,
    success: statusCode,
  });
};
const sendSuccessTest = (res, user, statusCode = 200, msg = 'successfully') => {
  return res.status(statusCode).json(user);
};
const controller = {
  sendSuccess,
  sendError,
  sendSuccessTest,
};

module.exports = controller;
