const Rating = require('../models/ratingModel');
const Account = require('../models/accountModel');

//REVIEW
// get Post review
const getRating = async (PostId, AccountId) => {
  try {
    let rate = await Rating.findOne({ PostId });

    let rating = 0;
    let byAccount = 0;
    if (rate !== null) {
      //rating của toàn bài viết
      const dataRate = rate.Rate;
      //trả ra email từ accountid
      let Rates = [];
      for (const i in dataRate) {
        const accountId = dataRate[i].AccountId;
        const data = await Account.findOne({ _id: accountId });
        const FullName = data.FullName;
        const Rate = dataRate[i].Rate;

        if (accountId === AccountId) {
          byAccount = Rate;
        }
        let temp = {};
        temp.FullName = FullName;
        temp.Rate = Rate;
        Rates.push(temp);
      }

      const count = Object.values(Rates).length;
      const AvgRate = rate.AvgRate;

      rating = { Rates, AvgRate, count };
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
