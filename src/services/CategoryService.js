const Category = require('../models/categoryModel');

const getCategory = async (body) => {
  let { GroupId } = body;
  //const Id = 'Review';
  try {
    const category = await Category.find({});
    console.log('category' + category);
    const data = category[0].Group;
    console.log('data' + data);
    let post = data.find((x) => x.id === GroupId);
    console.log('post' + post);
    post = post.Category;

    if (post.length <= 0) {
      return {
        msg: 'Không có category nào!',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả category của ' + GroupId + ' thành công!',
        statusCode: 200,
        data: post,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};
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

module.exports = {
  getCategory,
};
