const Post = require('../models/postModel');
const Account = require('../models/accountModel');
const { getRating } = require('../services/RatingService');
const { GetComment } = require('../services/CommentService');

//Lấy rate cho bài viết {Group lọc cho các trang Review,Exp, Forum}
const getRates = async (Group, AccountId, GroupId) => {
  for (const i in Group) {
    const PostId = Group[i].Id;
    const getRate = (await getRating(PostId, AccountId)).data;
    if (getRate.result == -1) {
      Group = -1;
      return { data: Group };
    }
    let Rating = getRate.rating;
    let RatingbyAcc = getRate.byAccount;

    const dataPost = Group[i];

    //Lấy cmt bài viết
    const getCmt = (await GetComment({ PostId })).data;

    const Comment = getCmt.comment;
    //console.log(Comment);
    const CommentCount = getCmt.countCmt;
    //console.log(getCmt.countCmt);

    //lấy fullname từ id account
    const accountId = dataPost.AccountId;
    const account = await Account.findOne({ _id: accountId });
    const FullName = account.FullName;

    let temp;
    //lấy avatar cho trang forum
    if (GroupId === 'Forum') {
      //Lấy avatar
      let avatar = account.Avatar;
      temp = {
        FullName,
        avatar,
        dataPost,
        Rating,
        RatingbyAcc,
        Comment,
        CommentCount,
      };
    } else {
      temp = { FullName, dataPost, Rating, RatingbyAcc, Comment, CommentCount };
    }
    Group[i] = temp;
  }
  return { data: Group };
};

//Lấy tất cả các bài viết dc duyệt {Id lọc cho các trang Review,Exp, Forum}

const getPostbyGroupId = async (body) => {
  let { AccountId, GroupId } = body;
  //const Id = 'Review';
  try {
    console.log('FUNC GET POST BY GROUP ID');
    const post = await Post.find({});
    const data = post[0].Group;

    let group = data.find((x) => x.Id === GroupId);
    if (group) {
      group = group.Post;
      //Lấy bài viết đã duyệt
      group = group.filter((x) => x.Status === true && x.IsShow === true);

      if (group.length <= 0) {
        return {
          msg: 'Không có bài viết nào!',
          statusCode: 300,
        };
      } else {
        //Lấy rating của bài viết và rate của riêng account
        group = (await getRates(group, AccountId, GroupId)).data;

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
    } else {
      return {
        msg: 'LKhông có bài viết nào trong group này!',
        statusCode: 300,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

/*Lấy tất cả các bài viết dc duyệt theo loại {Id lọc cho các trang Review,Exp, Forum}*/
const getPostbyCategory = async (body) => {
  let { AccountId, GroupId, CategoryId } = body;
  try {
    console.log('FUNC GET POST BY CATEGORY ID');
    //Lấy tất cả bài đã được duyệt
    let post = await getPostbyGroupId({ AccountId, GroupId });
    post = post.data;
    console.log(post);

    //Tìm và lấy theo loại
    if (post) {
      let result = post.filter((x) => x.dataPost.CategoryId === CategoryId);
      console.log(result);

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
    } else {
      return {
        msg: 'Không có bài viết nào!',
        statusCode: 300,
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
  let { AccountId } = body;
  //
  try {
    //Lấy bài review
    let GroupId = 'Review';
    const review = (await getPostbyGroupId({ AccountId, GroupId })).data;
    //console.log('review' + review);

    //lấy bài Eperience
    GroupId = 'Experience';
    const exp = (await getPostbyGroupId({ AccountId, GroupId })).data;

    //Lấy bài forum
    GroupId = 'Forum';
    const forum = (await getPostbyGroupId({ AccountId, GroupId })).data;

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

//Lấy chi tiết bài viết
const getDetailPost = async (body) => {
  let { AccountId, GroupId, PostId } = body;
  try {
    //Lấy bài theo group
    let post = (await getPostbyGroupId({ AccountId, GroupId })).data;
    //post = post.data;
    if (post) {
      let result = post.filter((x) => x.dataPost.Id === PostId);

      if (result.length <= 0) {
        return {
          msg: 'Không tìm thấy bài viết!',
          statusCode: 300,
        };
      } else {
        return {
          msg: 'Lấy bài viết ' + PostId + ' thành công!',
          statusCode: 200,
          data: result,
        };
      }
    } else {
      return {
        msg: 'Không có bài viết nào của group này!',
        statusCode: 300,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//updatePost
const updatePost = async (body) => {
  let { AccountId, data, GroupId, PostId } = body;
  //
  try {
    //Lấy bài viết
    const lstPost = await Post.find({});
    const _id = lstPost[0]._id;
    let group = lstPost[0].Group;

    //Lọc bài viết theo group
    let post = (await getPostbyGroupId({ AccountId, GroupId })).data;
    if (post) {
      let tmp = [];

      //Lấy data của bài viết
      for (const i in post) {
        tmp.push(post[i].dataPost);
      }

      //Cập nhập data bài viết mới
      tmp = tmp.map((x) => (x.Id === PostId ? data : x));

      //Cập nhật data của cả group
      let postMap = { Id: GroupId, Post: tmp };
      group = group.map((x) => (x.Id === GroupId ? postMap : x));

      //cập nhập vào collection Post
      await Post.findOneAndUpdate({ _id }, { Group: group });
      const res = (await getDetailPost({ AccountId, GroupId, PostId })).data;

      if (res) {
        return {
          msg: 'Update bài viết thành công!',
          statusCode: 200,
          data: { res },
        };
      }
    } else {
      return {
        msg: 'Không có bài viết nào trong group này vui lòng kiểm tra lại thông tin!',
        statusCode: 300,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

const searchPost = async (req) => {
  const searchField = req.query.keyword;
  console.log(searchField);
  try {
    const post = await Post.find({});
    const data = post[0].Group;
    let search = {};
    let n = 0;
    for (const i in data) {
      let temp = data[i].Post;
      temp = temp.filter((x) => x.Status === true);
      let result = temp.filter((x) => x.Title.match(searchField));
      //console.log(result);
      if (result.length > 0) {
        search[n] = result;
        n++;
      }
    }
    //console.log(search);
    if (Object.values(search).length === 0) {
      return {
        msg: 'Không tìm thấy kết quả nào',
        statusCode: 300,
      };
    }
    return {
      msg: 'Tìm kiếm thành công',
      statusCode: 200,
      data: { search },
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
  searchPost,
  updatePost,
  getDetailPost,
};
