const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CategorySchema = new schema({
  Group: [
    {
      id: { type: String, require: true },
      Category: [
        {
          id: { type: String, require: true },
          Name: { type: String, require: true },
        },
      ],
    },
  ],
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
