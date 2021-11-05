const Post = require('../models/postModel');

//REVIEW
// get Post review
const getReview = async (body) => {
  try {
    const Id = 'Review';
    const post = await Post.find({});
    const data = post[0].Group;
    let review = data.find((x) => x.Id === Id);
    review = review.Post;

    //Lấy bài viết đã duyệt
    review = review.filter((x) => x.Status === true);
    console.log('review:' + review);

    //lấy ra 15 bài review mới nhất
    let topreview = Array.from(review);
    topreview.reverse();
    topreview = topreview.slice(0, 16);
    console.log('Index:' + topreview);

    if (review.length <= 0) {
      return {
        msg: 'Không có bài review nào!',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả bài review thành công!',
        statusCode: 200,
        data: { review, topreview },
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//get post review by CategoryId
const getReviewbyCategory = async (body) => {
  let { CategoryId } = body;
  console.log('Categoryid:' + CategoryId);
  try {
    //Lấy tất cả bài review đã được duyệt
    let post = await getReview();
    post = post.data.review;

    //Tìm và lấy theo loại
    let result = post.filter((x) => x.CategoryId === CategoryId);
    console.log('get by category' + result);

    if (result.length <= 0) {
      return {
        msg: 'Không có bài review nào!',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả bài review thành công!',
        statusCode: 200,
        data: result,
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
// get Post Experience
const getExperience = async (body) => {
  try {
    const Id = 'Experience';
    const post = await Post.find({});
    const data = post[0].Group;
    let experience = data.find((x) => x.Id === Id);
    experience = experience.Post;

    //Lấy bài chia sẻ đã duyệt
    experience = experience.filter((x) => x.Status === true);
    console.log('all:' + experience);

    //Lấy ra 5 bài kinh nghiệm mới nhất
    let topexp = Array.from(experience);
    topexp.reverse();
    topexp = topexp.slice(0, 6);

    console.log('Index:' + topexp);

    if (experience.length <= 0) {
      return {
        msg: 'Không có bài chia sẻ kinh nghiệm nào!',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả bài chia sẻ kinh nghiệm thành công!',
        statusCode: 200,
        data: { experience, topexp },
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//get post Experience by CategoryId
const getEXPbyCategory = async (body) => {
  let { CategoryId } = body;
  console.log('Categoryid:' + CategoryId);
  try {
    //Lấy tất cả bài Experience đã được duyệt
    let post = await getExperience();
    post = post.data.experience;

    //Tìm và lấy theo loại
    let result = post.filter((x) => x.CategoryId === CategoryId);
    console.log('get by category' + result);

    if (result.length <= 0) {
      return {
        msg: 'Không có bài experience nào!',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả bài exerience thành công!',
        statusCode: 200,
        data: result,
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
    const post = await Post.find({});
    const data = post[0].Group;
    let forum = data.find((x) => x.Id === Id);
    forum = forum.Post;

    //Lấy bài chia sẻ đã duyệt
    forum = forum.filter((x) => x.Status === true);
    console.log('all:' + forum);

    //Lấy ra 5 bài trong forum mới nhất
    let topfrm = Array.from(forum);
    topfrm.reverse();
    topfrm = topfrm.slice(0, 6);

    console.log('Index:' + topfrm);

    if (forum.length <= 0) {
      return {
        msg: 'Không có bài viết nào trong forum!',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả bài viết trong forum thành công!',
        statusCode: 200,
        data: { forum, topfrm },
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//get post forum by CategoryId
const getForumbyCategory = async (body) => {
  let { CategoryId } = body;
  console.log('Categoryid:' + CategoryId);
  try {
    //Lấy tất cả bài forum đã được duyệt
    let post = await getForum();
    post = post.data.forum;

    //Tìm và lấy theo loại
    let result = post.filter((x) => x.CategoryId === CategoryId);
    console.log('get by category' + result);

    if (result.length <= 0) {
      return {
        msg: 'Không có bài viết nào trong forum!',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả bài viết trong forum thành công!',
        statusCode: 200,
        data: result,
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
  getReviewbyCategory,
  getEXPbyCategory,
  getForumbyCategory,
};
