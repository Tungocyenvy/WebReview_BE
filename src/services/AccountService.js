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
        const newAccount = new Account({
          UserName,
          PassWord: hassPassword,
          Email,
          Type: 'Defaul',
          FullName,
          DOB,
          Address,
          IsAdmin: false,
          Avatar:
            'https://res.cloudinary.com/blogreview/image/upload/v1636626365/review_web/hzshd4vahy6hw6m0a9p5.png',
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
        const Reset = data.Reset;
        if (Reset) {
          return {
            msg: 'Vui lòng đổi mật khẩu mới trước khi sử dụng!',
            statusCode: 200,
            data: {
              Token: token,
              IsAdmin: data.IsAdmin,
              Reset,
            },
          };
        }
        //const token = data.Token;
        return {
          msg: 'Đăng nhập thành công!',
          statusCode: 200,
          data: {
            Token: token,
            IsAdmin: data.IsAdmin,
            Reset,
          },
        };
      } else {
        return {
          msg: 'Tên đăng nhập hoặc mật khẩu không đúng!',
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
      account.Reset = true;
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
    const account = await Account.findOne({ _id: IDToken });
    const hashPassword = account.PassWord;
    const result = await bcrypt.compare(PassWord, hashPassword);
    if (result) {
      if (NewPassword === ConfirmPassword) {
        const saltOrRound = 8;
        const HashNewPassword = await bcrypt.hash(NewPassword, saltOrRound);
        account.PassWord = HashNewPassword;
        account.Reset = false;
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
const getUserDataService = async (body) => {
  let { AccountId } = body;
  console.log(AccountId);
  try {
    const data = await Account.findOne({ _id: AccountId });
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

const UpdateUserService = async (AccountId, body) => {
  try {
    console.log(AccountId);
    await Account.findOneAndUpdate({ _id: AccountId }, body);
    const res = await Account.findOne({ _id: AccountId });
    console.log(res);
    //check data null
    return {
      msg: 'Cập nhập thông tin thành công',
      statusCode: 200,
      data: res,
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
  getUserDataService,
  UpdateUserService,
};
