const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CategorySchema = new schema({
  Group: [
    {
      _id: String,
      id: { type: String, require: true },
      Category: [
        {
          _id: String,
          id: { type: String, require: true },
          Name: { type: String, require: true },
          Status: { type: Boolean, default: true },
        },
      ],
    },
  ],
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
