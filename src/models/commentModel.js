const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CommentSchema = new schema({
  AccountId: { type: String, require: true },
  Content: { type: String, require: true },
  PostId: { type: String, require: true },
  Reply: [
    {
      _id: String,
      AccountId: { type: String, require: true },
      Content: { type: String, require: true },
      CreateAt: { type: String, require: true },
    },
  ],
  CreateAt: { type: String, require: true },
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
