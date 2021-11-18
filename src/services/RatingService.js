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

//Đánh giá bài viết
const createRating = async (AccountId, PostId, body) => {
  let { Rate } = body;
  try {
    let rate = await Rating.findOne({ PostId });
    // let rating = 0;
    // let byAccount = 0;
    let tmp = { AccountId, Rate };
    console.log(tmp);
    if (rate) {
      //rating của toàn bài viết
      let AvgRate = 0;
      let dataRate = rate.Rate;
      dataRate.push(tmp);

      //Cập nhập lại AvgRate
      for (const i in dataRate) {
        AvgRate += dataRate[i].Rate;
      }
      const count = Object.values(dataRate).length;
      AvgRate = Math.round((AvgRate / count) * 10) / 10;
      console.log(AvgRate);
      let lstRate = { PostId, Rate: dataRate, AvgRate };
      //let rating = { Rates, AvgRate, count };
      console.log(lstRate);
      await Rating.findOneAndUpdate({ PostId }, lstRate);
    }
    //Bài viết chưa được rate trước đó thì tạo mới
    else {
      const newRate = new Rating({ PostId, Rate: tmp, AvgRate: Rate });
      newRate.save();
    }
    const resave = await Rating.findOne({ PostId });
    return {
      msg: 'Đánh giá thành công',
      statusCode: 200,
      data: resave,
    };
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//Chỉnh sửa đánh giá
const updateRating = async (AccountId, PostId, body) => {
  let { Rate } = body;
  try {
    let rate = await Rating.findOne({ PostId });
    // let rating = 0;
    // let byAccount = 0;
    let tmp = { AccountId, Rate };
    console.log(tmp);
    if (rate) {
      //rating của toàn bài viết
      let AvgRate = 0;
      let dataRate = rate.Rate;
      dataRate = dataRate.map((x) => (x.AccountId === AccountId ? tmp : x));

      //Cập nhập lại AvgRate
      for (const i in dataRate) {
        AvgRate += dataRate[i].Rate;
      }
      const count = Object.values(dataRate).length;
      AvgRate = Math.round((AvgRate / count) * 10) / 10;
      console.log(AvgRate);
      let lstRate = { PostId, Rate: dataRate, AvgRate };
      //let rating = { Rates, AvgRate, count };
      console.log(lstRate);
      await Rating.findOneAndUpdate({ PostId }, lstRate);
    }
    const resave = await Rating.findOne({ PostId });
    return {
      msg: 'Chỉnh sửa đánh giá thành công',
      statusCode: 200,
      data: resave,
    };
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

module.exports = {
  getRating,
  createRating,
  updateRating,
};
