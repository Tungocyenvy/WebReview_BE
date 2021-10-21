const { createToken } = require('./jwtService');
const bcrypt = require('bcrypt');
const Account = require('../models/accountModel');

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
  let { User, PassWord } = body;
  User = User.trim();
  PassWord = PassWord.trim();

  const Email = User;
  const UserName = User;

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

module.exports = {
  SignupService,
  SigninService,
};
