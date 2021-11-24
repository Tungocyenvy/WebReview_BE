const mongoose = require('mongoose');
const schema = mongoose.Schema;

const AccountSchema = new schema({
  UserName: { type: String, require: true },
  PassWord: { type: String, require: true },
  Email: { type: String, require: true },
  Type: { type: String, require: true },
  FullName: { type: String, require: true },
  DOB: { type: String, require: true },
  Address: { type: String, require: true },
  IsAdmin: { type: Boolean, require: true },
  Avatar: { type: String, require: true },
  Reset: { type: Boolean, default: false },
});

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
