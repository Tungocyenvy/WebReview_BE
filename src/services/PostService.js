const Post = require('../models/postModel');
const { getRating } = require('../services/RatingService');

//Lấy rate cho bài viết {Group lọc cho các trang Review,Exp, Forum}
const getRates = async (Group, Email) => {
  for (const i in Group) {
    const PostId = Group[i].Id;
    const getRate = (await getRating(PostId, Email)).data;
    if (getRate.result == -1) {
      Group = -1;
      return { data: Group };
    }
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

const getPostbyGroupId = async (body) => {
  let { Email, GroupId } = body;
  //const Id = 'Review';
  try {
    const post = await Post.find({});
    const data = post[0].Group;

    let group = data.find((x) => x.Id === GroupId);
    group = group.Post;
    //Lấy bài viết đã duyệt
    group = group.filter((x) => x.Status === true);
    //console.log('review:' + review);
    if (group.length <= 0) {
      return {
        msg: 'Không có bài viết nào!',
        statusCode: 300,
      };
    } else {
      //Lấy rating của bài viết và rate của riêng account
      group = (await getRates(group, Email)).data;

      if (group == -1) {
        return {
          msg: 'Lỗi trong quá trình lấy Rating!',
          statusCode: 300,
        };
      } else {
        return {
          msg: 'Lấy tất cả bài viết trong ' + GroupId + ' thành công!',
          statusCode: 200,
          data: group,
        };
      }
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//Lấy tất cả các bài viết dc duyệt theo loại {Id lọc cho các trang Review,Exp, Forum}
const getPostbyCategory = async (body) => {
  let { Email, GroupId, CategoryId } = body;
  try {
    //Lấy tất cả bài đã được duyệt
    let post = await getPostbyGroupId({ GroupId, Email });
    post = post.data;

    //Tìm và lấy theo loại
    let result = post.filter((x) => x.dataPost.CategoryId === CategoryId);
    console.log('get by category' + result);

    if (result.length <= 0) {
      return {
        msg: 'Không có bài viết nào!',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả bài viết ' + CategoryId + ' thành công!',
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

//Lấy tất cả bài viết cho trang index
const getPost = async (body) => {
  let { Email } = body;
  //
  try {
    //Lấy bài review
    let GroupId = 'Review';
    const review = (await getPostbyGroupId({ GroupId, Email })).data;
    console.log('reciew' + review);

    //lấy bài Eperience
    GroupId = 'Experience';
    const exp = (await getPostbyGroupId({ GroupId, Email })).data;

    //Lấy bài forum
    GroupId = 'Forum';
    const forum = (await getPostbyGroupId({ GroupId, Email })).data;

    //lấy ra 15 bài review mới nhất
    let topreview = Array.from(review);
    topreview.reverse();
    topreview = topreview.slice(0, 16);

    //Lấy ra 5 bài kinh nghiệm mới nhất
    let topexp = Array.from(exp);
    topexp.reverse();
    topexp = topexp.slice(0, 6);

    //Lấy ra 5 bài trong forum mới nhất
    let topfrm = Array.from(forum);
    topfrm.reverse();
    topfrm = topfrm.slice(0, 6);

    return {
      msg: 'Lấy tất cả bài viết thành công!',
      statusCode: 200,
      data: { topreview, topexp, topfrm },
    };
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

module.exports = {
  getPost,
  getPostbyGroupId,
  getPostbyCategory,
};
