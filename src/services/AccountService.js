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
          msg: 'Email is existed',
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
            msg: 'SignUp SuccessFull',
            statusCode: 200,
            data: DataUser,
          };
        } else {
          return {
            msg: 'Error while saving new Customer',
            statusCode: 300,
          };
        }
      }
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error while checking existed Customer',
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
          msg: 'Sign In Successful ',
          statusCode: 200,
          data: {
            Token: token,
            IsAdmin: data.IsAdmin,
          },
        };
      } else {
        return {
          msg: 'Incorrect Password',
          statusCode: 300,
        };
      }
    } catch {
      return {
        msg: 'Error while checking password',
        statusCode: 300,
      };
    }
  } else {
    return {
      msg: 'Account is not exist',
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
        msg: 'Get Password Success',
        statusCode: 200,
      };
    } else {
      return {
        msg: 'Get Password false',
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
          msg: 'Change Password Success',
          statusCode: 200,
        };
      } else {
        return {
          msg: 'New Password and Comfirm Password not match',
          statusCode: 300,
        };
      }
    } else {
      return {
        msg: 'the password is incorrect!',
        statusCode: 300,
      };
    }
  } catch {
    return {
      msg: 'Error while change Password',
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
        msg: 'User not Found',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'get Data User Successful',
        statusCode: 200,
        data: data,
      };
    }
  } catch {
    return {
      msg: 'Error while get Data User',
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
      msg: 'update Data User success',
      statusCode: 200,
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error whilte update data Customer',
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
