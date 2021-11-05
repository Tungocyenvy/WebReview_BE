const Category = require('../models/categoryModel');

//REVIEW
// get Category review
const getReview = async (body) => {
  try {
    const Id = 'RV';
    const category = await Category.find({});
    const data = category[0].Group;
    let review = data.find((x) => x.id === Id);
    review = review.Category;

    if (review.length <= 0) {
      return {
        msg: 'Không có category nào!',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả category của review thành công!',
        statusCode: 200,
        data: review,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//EXPERIENCE
// get Category Experience
const getExperience = async (body) => {
  try {
    const Id = 'EXP';
    const category = await Category.find({});
    const data = category[0].Group;
    let exp = data.find((x) => x.id === Id);
    exp = exp.Category;

    if (exp.length <= 0) {
      return {
        msg: 'Không có category nào!',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả category của chia sẻ kinh nghiệm thành công!',
        statusCode: 200,
        data: exp,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//FORUM
// get Post Forum
const getForum = async (body) => {
  try {
    const Id = 'Forum';
    const category = await Category.find({});
    const data = category[0].Group;
    let forum = data.find((x) => x.id === Id);
    forum = forum.Category;

    if (forum.length <= 0) {
      return {
        msg: 'Không có category nào',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả category của forum thành công!',
        statusCode: 200,
        data: forum,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

module.exports = {
  getReview,
  getExperience,
  getForum,
};
