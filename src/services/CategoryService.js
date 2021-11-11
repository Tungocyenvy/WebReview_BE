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

module.exports = {
  getCategory,
};
