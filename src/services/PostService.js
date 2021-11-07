const Post = require('../models/postModel');
const { getRating } = require('../services/RatingService');

//REVIEW
// get Post review
const getReview = async (body) => {
  let { Email } = body;
  console.log('body:' + body);
  console.log('Email:' + Email);
  try {
    //Lấy bài viết đã duyệt
    const Id = 'Review';
    const review = (await getPost(Id, Email)).data;

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
  let { Email, CategoryId } = body;
  console.log('Categoryid:' + CategoryId);
  try {
    //Lấy tất cả bài review đã được duyệt
    let post = await getReview({ Email });
    post = post.data.review;

    //Tìm và lấy theo loại
    let result = post.filter((x) => x.dataPost.CategoryId === CategoryId);
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
  let { Email } = body;
  try {
    //Lấy bài chia sẻ đã duyệt
    const Id = 'Experience';
    const experience = (await getPost(Id, Email)).data;

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
  let { Email, CategoryId } = body;
  console.log('Categoryid:' + CategoryId);
  try {
    //Lấy tất cả bài Experience đã được duyệt
    let post = await getExperience({ Email });
    post = post.data.experience;

    //Tìm và lấy theo loại
    let result = post.filter((x) => x.dataPost.CategoryId === CategoryId);
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
  let { Email } = body;
  try {
    //Lấy bài đăng trong forum đã duyệt
    const Id = 'Forum';
    const forum = (await getPost(Id, Email)).data;

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
  let { Email, CategoryId } = body;
  console.log('Categoryid:' + CategoryId);
  try {
    //Lấy tất cả bài forum đã được duyệt
    let post = await getForum({ Email });
    post = post.data.forum;

    //Tìm và lấy theo loại
    let result = post.filter((x) => x.dataPost.CategoryId === CategoryId);
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

//Lấy rate cho bài viết {Group lọc cho các trang Review,Exp, Forum}
const getRates = async (Group, Email) => {
  for (const i in Group) {
    const PostId = Group[i].Id;
    const getRate = (await getRating(PostId, Email)).data;

    let Rating = getRate.rating;
    let RatingbyAcc = getRate.byAccount;

    if (!Rating) {
      Rating = 0;
      RatingbyAcc = 0;
    }

    const dataPost = Group[i];
    let temp = { dataPost, Rating, RatingbyAcc };
    Group[i] = temp;

    console.log('Group[i]');
    console.log(Group[i]);
  }
  return { data: Group };
};

//Lấy tất cả các bài viết dc duyệt {Id lọc cho các trang Review,Exp, Forum}
const getPost = async (Id, Email) => {
  //const Id = 'Review';
  const post = await Post.find({});
  const data = post[0].Group;

  let group = data.find((x) => x.Id === Id);
  group = group.Post;

  //Lấy bài viết đã duyệt
  group = group.filter((x) => x.Status === true);
  //console.log('review:' + review);

  //Lấy rating của bài viết và rate của riêng account
  group = (await getRates(group, Email)).data;

  return { data: group };
};

module.exports = {
  getReview,
  getExperience,
  getForum,
  getReviewbyCategory,
  getEXPbyCategory,
  getForumbyCategory,
};
