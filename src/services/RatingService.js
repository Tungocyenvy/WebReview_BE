const Rating = require('../models/ratingModel');

//REVIEW
// get Post review
const getRating = async (PostId, Email) => {
  try {
    let rating = await Rating.findOne({ PostId });
    const data = rating.Rate;
    let byAccount = data.filter((x) => x.Email === Email);

    if (byAccount.length <= 0) {
      byAccount = 0;
    }

    return {
      data: { rating, byAccount },
    };
  } catch {
    rating = -1;
    byAccount = -1;
    return {
      data: rating,
      byAccount,
    };
  }
};

module.exports = {
  getRating,
};
