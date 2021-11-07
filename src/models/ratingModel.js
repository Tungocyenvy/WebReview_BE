const mongoose = require('mongoose');
const schema = mongoose.Schema;

const RatingSchema = new schema({
  PostId: { type: String, require: true },
  Rate: [
    {
      _id: String,
      Email: { type: String, require: true },
      Rate: { type: Number, require: true },
    },
  ],
  AvgRate: { type: Number, require: true },
});

const Rating = mongoose.model('Rating', RatingSchema);
module.exports = Rating;
