const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PostSchema = new schema({
  Group: [
    {
      _id: String,
      Id: { type: String, require: true },
      Post: [
        {
          _id: String,
          Id: { type: String, require: true },
          Title: { type: String, require: true },
          Image: { type: String, require: true },
          Overview: { type: String, require: true },
          Content: { type: String, require: true },
          AccountId: { type: String, require: true },
          CategoryId: { type: String, require: true },
          Status: { type: Boolean, require: true, default: false },
          IsShow: { type: Boolean, default: true, default: true },
          CreateAt: { type: Date, require: true, default: Date.now() },
        },
      ],
    },
  ],
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
