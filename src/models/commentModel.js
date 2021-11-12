const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CommentSchema = new schema({
  _id: { type: String },
  AccountId: { type: String, require: true },
  Content: { type: String, require: true },
  PostId: { type: String, require: true },
  CreateAt: { type: Date },
  Reply: [
    {
      _id: { type: String },
      AccountId: { type: String, require: true },
      Content: { type: String, require: true },
      CreateAt: { type: Date },
    },
  ],
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
