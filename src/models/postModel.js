const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PostSchema = new schema({
  Group: [
    {
      Id: { type: String, require: true },
      Post: [
        {
          Id: { type: String, require: true },
          Title: { type: String, require: true },
          Image: { type: String, require: true },
          Overview: { type: String, require: true },
          Content: { type: String, require: true },
          AccountId: { type: String, require: true },
          CategoryId: { type: String, require: true },
          Status: { type: String, require: true },
          CreateAt: { type: String, require: true },
        },
      ],
    },
  ],
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
