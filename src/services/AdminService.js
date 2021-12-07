const Account = require('../models/accountModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const Rating = require('../models/ratingModel');

//ACCOUNT
const GetAccount = async () => {
  try {
    const accounts = await Account.find({ IsAdmin: false });
    if (!accounts) {
      return {
        msg: 'Không có người dùng nào!',
        statusCode: 300,
      };
    }
    return {
      msg: 'Lấy tài khoản người dùng thành công',
      statusCode: 200,
      data: { accounts },
    };
  } catch (error) {
    return {
      msg: 'Lỗi trong quá trình lấy tài khoản người dùng',
      statusCode: 300,
    };
  }
};

const DeleteAccount = async (body) => {
  let accountId = body;
  try {
    // xóa post của user  và rating của post
    const posts = await Post.find({});
    const data = posts[0].Group;
    const _id = posts[0]._id;
    //console.log(data);
    // const post = data[0].Post;
    // let index = post.findIndex((x) => {return  x.Id === 'RV1'});
    // console.log(index);
    for (const i in data) {
      let post = data[i].Post;
      for (var k = 0; k < post.length; k++) {
        if (post[k].AccountId === accountId) {
          const postId = post[k].Id;
          await Rating.findOneAndDelete({ PostId: postId });
          post.splice(k, 1);
          k--;
        }
      }
      data[i].Post = post;
    }
    posts[0].Group = data;
    let tmp = posts[0].Group;
    await Post.findOneAndUpdate({ _id }, { Group: tmp });

    //xóa rating của account
    const rating = await Rating.find({});
    for (const i in rating) {
      let rate = rating[i].Rate;
      let id = rating[i]._id;
      let PostId = rating[i].PostId;
      for (const k in rate) {
        if (rate[k].AccountId === accountId) {
          rate.splice(k, 1);
        }
        console.log(rate.length);
        if (rate.length === 0) {
          await Rating.findOneAndDelete({ _id: id });
        } else {
          let AvgRate = rate.map((x) => Number(x.Rate)).reduce((a, b) => a + b);

          const count = Object.values(rate).length;
          AvgRate = Math.round((AvgRate / count) * 10) / 10;
          console.log(AvgRate);
          let lstRate = { PostId, Rate: rate, AvgRate };
          //let rating = { Rates, AvgRate, count };
          console.log(lstRate);
          await Rating.findOneAndUpdate({ _id: id }, lstRate);
        }
      }
      await Rating.findOneAndUpdate({ _id: id }, { Rate: rate });
    }
    //xóa cmt
    const comment = await Comment.find({});
    for (const i in comment) {
      await Comment.findOneAndDelete({ AccountId: accountId });
    }
    //xóa reply
    for (const i in comment) {
      let replys = comment[i].Reply;
      let id = comment[i]._id;
      //console.log(replys)
      for (var k = 0; k < replys.length; k++) {
        if (replys[k].AccountId === accountId) {
          //console.log(k);
          replys.splice(k, 1);
          k--;
        }
      }
      comment[i].Replys = replys;
      await Comment.findOneAndUpdate({ _id: id }, { Reply: replys });
    }
    await Account.findOneAndDelete({ _id: accountId });
    return {
      msg: 'Xóa tài khoản thành công',
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: 'Xảy ra lỗi trong quá trình xóa tài khoản',
      statusCode: 300,
    };
  }
};

//POST
const GetPostFalse = async (body) => {
  let GroupId = body;
  console.log(GroupId);
  try {
    console.log('FUNC GET POST BY GROUP ID');
    const post = await Post.find({});
    const data = post[0].Group;

    let group = data.find((x) => x.Id === GroupId);
    if (group) {
      group = group.Post;
      //Lấy bài viết chưa duyệt
      group = group.filter((x) => x.Status === false);

      if (group.length <= 0) {
        return {
          msg: 'Không có bài viết nào!',
          statusCode: 300,
        };
      }
      for (const i in group) {
        const dataPost = group[i];
        const accountId = dataPost.AccountId;
        const account = await Account.findOne({ _id: accountId });
        const FullName = account.FullName;
        let data = {};
        data.Id = dataPost.Id;
        data.Title = dataPost.Title;
        data.Image = dataPost.Image;
        data.Content = dataPost.Content;
        data.FullName = FullName;
        data.CategoryId = dataPost.CategoryId;
        data.CreateAt = dataPost.CreateAt;
        group[i] = data;
      }
      return {
        msg: 'Lấy tất cả bài viết trong ' + GroupId + ' thành công!',
        statusCode: 200,
        data: group,
      };
    } else {
      return {
        msg: 'Không có bài viết nào trong group này!',
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

// duyệt bài viết
const UpdateStatusPost = async (body) => {
  let { GroupId, PostId } = body;
  try {
    //lấy bài viêt
    const posts = await Post.find({});
    const _id = posts[0]._id;
    let group = posts[0].Group;
    console.log(GroupId);
    //loc bai viet theo group
    const dataGroup = group.find((e) => e.Id === GroupId);
    //const post = dataGroup[0].Post;
    console.log(PostId);
    if (dataGroup) {
      let tmp = dataGroup.Post.find((x) => x.Id === PostId);
      console.log(tmp);
      if (!tmp) {
        return {
          msg: 'Bài viết không tồn tại!',
          statusCode: 300,
        };
      }
      tmp.Status = true;
      //Đổi status trong post
      let post = dataGroup.Post;
      post = post.map((x) => (x.Id === PostId ? tmp : x));
      dataGroup.Post = post; //Cập nhập vào post
      group = group.map((x) => (x.Id === GroupId ? dataGroup : x)); //cập nhập vào group
      await Post.findOneAndUpdate({ _id }, { Group: group });
      return {
        msg: 'Duyệt bài viết thành công!',
        statusCode: 200,
      };
    }
    return {
      msg: 'Không có bài viết nào trong group này vui lòng kiểm tra lại thông tin!',
      statusCode: 300,
    };
  } catch (error) {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//Lấy chi tiết bài viết (dùng cho bài chưa duyệt)
const getDetailPost = async (body) => {
  let { GroupId, PostId } = body;
  try {
    const lstPost = await Post.find({});
    const data = lstPost[0].Group;

    let group = data.find((x) => x.Id === GroupId);
    if (group) {
      group = group.Post;
      //Lấy bài viết
      let dataPost = group.find((x) => x.Id === PostId);
      console.log(dataPost);
      if (dataPost) {
        const accountId = dataPost.AccountId;
        const account = await Account.findOne({ _id: accountId });
        FullName = account.FullName;
        let result = { GroupId, FullName, dataPost };
        return {
          msg: 'Lấy thông tin bài viết thành công!',
          statusCode: 200,
          data: result,
        };
      } else {
        return {
          msg: 'Không tìm thấy bài viết!',
          statusCode: 300,
        };
      }
    } else {
      return {
        msg: 'Không có bài viết nào trong group này vui lòng kiểm tra lại!',
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

//Xóa bài viết
const detetePost = async (body) => {
  let { GroupId, PostId } = body;
  try {
    const lstPost = await Post.find({});
    let data = lstPost[0].Group;
    const _id = lstPost[0]._id;
    console.log(data);
    let group = data.find((x) => x.Id === GroupId);
    if (group) {
      let tmp = group.Post;
      //Lấy bài viết và xóa
      let index = -1;
      index = tmp.findIndex((x) => x.Id === PostId);
      if (index === -1) {
        return {
          msg: 'Bài viết không tồn tại',
          statusCode: 300,
        };
      }

      tmp.splice(index, 1);

      //gán lại giá trị vào db
      group.Post = tmp;
      //console.log(group);
      data = data.map((x) => (x.Id === GroupId ? group : x));
      console.log(data);
      await Post.findOneAndUpdate({ _id }, { Group: data });
      return {
        msg: 'xóa ' + PostId + ' thành công!',
        statusCode: 200,
      };
    } else {
      return {
        msg: 'Không có bài viết nào trong group này vui lòng kiểm tra lại!',
        statusCode: 300,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình xóa',
      statusCode: 300,
    };
  }
};

module.exports = {
  GetAccount,
  DeleteAccount,
  GetPostFalse,
  UpdateStatusPost,
  getDetailPost,
  detetePost,
};
