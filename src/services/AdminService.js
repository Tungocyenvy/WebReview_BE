const Account = require('../models/accountModel');
const Post = require('../models/postModel');

//ACCOUNT
const GetAccount = async () => {
  try {
    const accounts = await Account.find({ IsAdmin: false });
    if (!accounts) {
      return {
        msg: 'Không có account nào!',
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

const DeleteAccount = async () => {};

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
    const group = posts[0].Group;
    console.log(GroupId);
    //loc bai viet theo group
    const dataGroup = group.filter((e) => e.Id === GroupId);
    const post = dataGroup[0].Post;
    console.log(PostId);
    if (post) {
      //tìm bài viết và đổi status
      for (const i in post) {
        if (post[i].Id === PostId) {
          post[i].Status = true;
        }
      }

      dataGroup[0].Post = post;
      let tmp = dataGroup[0].Post;

      for (const i in group) {
        if (group[i].Id === GroupId) {
          group[i].Post = tmp;
        }
      }
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

module.exports = { GetAccount, GetPostFalse, UpdateStatusPost };
