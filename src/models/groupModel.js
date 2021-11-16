const mongoose = require('mongoose');
const schema = mongoose.Schema;

const GroupSchema = new schema({
  _id: String,
  Name: { type: String, require: true },
});

const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;
