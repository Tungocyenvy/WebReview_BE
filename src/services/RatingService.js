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
      console.log('dataRate' + dataRate);
      //trà ra email từ accountid
      let Rates = [];
      for (const i in dataRate) {
        const accountId = dataRate[i].AccountId;
        const data = await Account.findOne({ _id: accountId });
        const Email = data.Email;
        const Rate = dataRate[i].Rate;
        console.log('AccountId' + AccountId);
        console.log('accountId' + accountId);
        if (accountId === AccountId) {
          byAccount = Rate;
        }
        let temp = {};
        temp.Email = Email;
        temp.Rate = Rate;
        Rates.push(temp);
      }

      const count = Object.values(Rates).length;
      const AvgRate = rate.AvgRate;
      console.log('AvgRate' + AvgRate);
      rating = { Rates, AvgRate, count };

      //lấy theo account
      //const byaccount = dataRate.find((x) => x.AccountId === AccountId);
      //const byaccount= await Rates.findOne(AccountId:)
      // console.log(byaccount);
      // if (byaccount) {
      //   byAccount = byaccount.Rate;

      // }
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
