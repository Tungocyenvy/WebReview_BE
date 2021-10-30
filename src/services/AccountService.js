const { createToken } = require('./jwtService');
const bcrypt = require('bcrypt');
const Account = require('../models/accountModel');
const rand = require('random');
const { SendMailVetify } = require('./SendMailService');

// Sign UP
const SignupService = async (body) => {
  let { UserName, PassWord, Email, FullName, DOB, Address } = body;
  try {
    const result = await Account.find({ Email });
    if (result) {
      if (result.length > 0) {
        //checkemail
        return {
          msg: 'Email này đã tồn tại!',
          statusCode: 300,
        };
      } else {
        const saltOrRound = 8;
        const hassPassword = await bcrypt.hash(PassWord, saltOrRound);
        const tokenEmail = Email;
        const token = createToken(tokenEmail);
        const newAccount = new Account({
          UserName,
          PassWord: hassPassword,
          Email,
          Type: 'Defaul',
          FullName,
          DOB,
          Address,
          IsAdmin: false,
          avatar: '',
          Token: token,
        });
        console.log('newAccount', newAccount);
        const resSave = await newAccount.save();
        if (resSave) {
          const DataUser = resSave.Token;
          return {
            msg: 'Đăng ký thành công',
            statusCode: 200,
            data: DataUser,
          };
        } else {
          return {
            msg: 'Lỗi! Không thể thêm tài khoản',
            statusCode: 300,
          };
        }
      }
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Lỗi trong khi kiểm tra email',
      statusCode: 300,
    };
  }
};

// Sign in
const SigninService = async (body) => {
  let { UserName, PassWord } = body;

  const Email = UserName;
  //const UserName = UserName;

  // kiểm tra tài khoản tồn tại trong Account chưa
  var data = await Account.findOne({ Email });
  if (data == null) {
    data = await Account.findOne({ UserName });
  }
  console.log(data);
  if (data != null) {
    const hashPassword = data.PassWord;
    const result = await bcrypt.compare(PassWord, hashPassword);
    try {
      if (result) {
        const id = data._id;
        const token = createToken(id);
        return {
          msg: 'Đăng nhập thành công!',
          statusCode: 200,
          data: {
            Token: token,
            IsAdmin: data.IsAdmin,
          },
        };
      } else {
        return {
          msg: 'Password không đúng!',
          statusCode: 300,
        };
      }
    } catch {
      return {
        msg: 'Xảy ra lỗi trong quá trình đăng nhập',
        statusCode: 300,
      };
    }
  } else {
    return {
      msg: 'Tài khoản không tồn tại',
      statusCode: 300,
    };
  }
};

// forget password
const ForgetPasswordService = async (body) => {
  try {
    let { Email } = body;
    const account = await Account.findOne({ Email });
    let random = rand.int((min = 100000), (max = 999999));
    random = random + '';
    if (account) {
      const saltOrRound = 8;
      const hassPassword = await bcrypt.hash(random, saltOrRound);
      account.PassWord = hassPassword;
      await account.save();
      const resMail = SendMailVetify(
        Email,
        'Mật Khẩu mới của bạn',
        random,
        null,
      );
      return {
        msg: 'Vui lòng kiểm tra email để nhận mật khẩu mới',
        statusCode: 200,
      };
    } else {
      return {
        msg: 'Lấy mật khẩu mới không thành công',
        statusCode: 300,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

// Change Password
const ChangePasswordService = async (IDToken, body) => {
  let { PassWord, NewPassword, ConfirmPassword } = body;

  try {
    const account = await Account.findOne({ Email: IDToken });
    const hashPassword = account.PassWord;
    const result = await bcrypt.compare(PassWord, hashPassword);
    if (result) {
      if (NewPassword === ConfirmPassword) {
        const saltOrRound = 8;
        const HashNewPassword = await bcrypt.hash(NewPassword, saltOrRound);
        account.PassWord = HashNewPassword;
        await account.save();
        return {
          msg: 'Đổi mật khẩu thành công!',
          statusCode: 200,
        };
      } else {
        return {
          msg: 'Mật khẩu không trùng khớp!',
          statusCode: 300,
        };
      }
    } else {
      return {
        msg: 'Mật khẩu hiện tại không đúng',
        statusCode: 300,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình đổi mật khẩu',
      statusCode: 300,
    };
  }
};

//get Infor User
const getUserDataSerice = async (body) => {
  let { Email } = body;
  console.log(Email);
  try {
    const data = await Account.findOne({ Email });
    if (!data) {
      return {
        msg: 'Không tìm thấy tài khoản',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy thông tin người dùng thành công',
        statusCode: 200,
        data: data,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

const UpdateUserService = async (Email, body) => {
  try {
    console.log(Email);
    const data = await Account.findOneAndUpdate({ Email: Email }, body);
    console.log(data);
    //check data null
    return {
      msg: 'Cập nhập thông tin thành công',
      statusCode: 200,
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      msg: 'Xảy ra lỗi trong quá trình thay đổi thông tin',
      statusCode: 300,
    };
  }
};

module.exports = {
  SignupService,
  SigninService,
  ForgetPasswordService,
  ChangePasswordService,
  getUserDataSerice,
  UpdateUserService,
};
