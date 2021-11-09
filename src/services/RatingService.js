const Rating = require('../models/ratingModel');

//REVIEW
// get Post review
const getRating = async (PostId, Email) => {
  try {
    let rate = await Rating.findOne({ PostId });
    let rating = 0;
    let byAccount = 0;
    if (rate !== null) {
      //rating của toàn bài viết
      const Rate = rate.Rate;
      const count = Object.values(Rate).length;
      const AvgRate = rate.AvgRate;
      console.log('AvgRate' + AvgRate);
      rating = { Rate, AvgRate, count };

      //lấy theo account
      const byaccount = Rate.find((x) => x.Email === Email);
      if (byaccount) {
        byAccount = byaccount.Rate;
      }
    }
    return {
      data: { rating, byAccount },
    };
  } catch {
    let result = -1;
    return {
      data: { result },
    };
  }
};

module.exports = {
  getRating,
};
