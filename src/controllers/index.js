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
const sendSuccessTest = (res, data, statusCode = 200, msg = 'successfully') => {
  return res.status(statusCode).json({
    data: data,
  });
};
const controller = {
  sendSuccess,
  sendError,
  sendSuccessTest,
};

module.exports = controller;
