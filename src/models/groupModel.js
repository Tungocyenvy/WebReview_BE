const mongoose = require('mongoose');
const schema = mongoose.Schema;

const GroupSchema = new schema({
  _id: { type: String },
  Name: { type: String, require: true },
  Status: { type: Boolean, default: true },
});

const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;
