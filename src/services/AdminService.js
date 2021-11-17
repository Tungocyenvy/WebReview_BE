const Account = require('../models/accountModel');

const GetAccount = async () => {
  try {
    const accounts = await Account.find({ IsAdmin: false });
    if (!accounts) {
      return {
        msg: 'Không có account nào!',
        statusCode: 300,
      };
    }
    return {
      msg: 'Lấy tài khoản người dùng thành công',
      statusCode: 200,
      data: { accounts },
    };
  } catch (error) {
    return {
      msg: 'Lỗi trong quá trình lấy tài khoản người dùng',
      statusCode: 300,
    };
  }
};

const DeleteAccount = async () => {};

module.exports = { GetAccount };
