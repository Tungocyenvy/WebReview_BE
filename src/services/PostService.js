const Post = require('../models/postModel');
const Account = require('../models/accountModel');
const Group = require('../models/groupModel');
const { getRating } = require('../services/RatingService');
const { GetComment } = require('../services/CommentService');

//Tạo id cho Post
const getPostId = (GroupId, lstPost) => {
  let Id = Number(lstPost.match(/[0-9]+$/)[0]) + 1;
  Id = GroupId + Id;
  return Id;
};

const removeVN = (Text) => {
  return Text.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

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

//Lấy tất cả bài viết review,exp,forum cho trang index (15-5-5)
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

//Lấy chi tiết bài viết đã duyệt
const getDetailPost = async (body) => {
  let { AccountId, GroupId, PostId } = body;
  try {
    //Lấy bài theo group
    let post = (await getPostbyGroupId({ AccountId, GroupId })).data;
    //post = post.data;
    if (post) {
      let tmp = post.filter((x) => x.dataPost.Id === PostId);
      if (tmp.length <= 0) {
        return {
          msg: 'Không tìm thấy bài viết!',
          statusCode: 300,
        };
      } else {
        let groupid = { GroupId: GroupId };
        tmp = tmp.pop();
        let result = { ...groupid, ...tmp };
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

//Chỉnh sửa bài viết
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

//Tạo bài viết
const createPost = async (AccountId, body) => {
  let { GroupId, Title, Image, Overview, Content, CategoryId } = body;
  try {
    const lstGroup = await Group.find({ _id: GroupId, Status: true });
    console.log(lstGroup);
    if (lstGroup.length <= 0) {
      return {
        msg: 'GroupId không tồn tại!',
        statusCode: 300,
      };
    } else {
      const lstPost = await Post.find({});
      const _id = lstPost[0]._id;
      let group = lstPost[0].Group;

      let data = group.find((x) => x.Id === GroupId);
      console.log(data);

      let tmp, id;
      //Nếu group này chưa có bài viết thì thêm mới
      if (!data) {
        id = GroupId + 1;
        tmp = {
          Id: id,
          Title,
          Image,
          Overview,
          Content,
          AccountId,
          CategoryId,
        };
        let post = { Id: GroupId, Post: tmp };
        group.push(post);
      }
      //Group đã có bài viết rồi
      else {
        //Tạo id cho bài viết
        let lstPost = data.Post[data.Post.length - 1].Id;
        console.log(lstPost);
        id = getPostId(GroupId, lstPost);
        console.log(id);
        tmp = {
          Id: id,
          Title,
          Image,
          Overview,
          Content,
          AccountId,
          CategoryId,
        };
        data.Post.push(tmp);
        group = group.map((x) => (x.id === GroupId ? data : x));
      }
      await Post.findOneAndUpdate({ _id }, { Group: group });
      const resave = (await getPostbyStatus(AccountId, 'false')).data;
      console.log(resave);
      if (resave) {
        return {
          msg: 'Thêm bài viết mới thành công!',
          statusCode: 200,
          data: resave,
        };
      }
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Lỗi trong quá trình thêm bài viết',
      statusCode: 300,
    };
  }
};

//Lấy bài viết đã được duyệt hoặc không (Dành cho phần quản lý bài viết)
//Nếu không truyền AccountId thì dùng cho search
const getPostbyStatus = async (AccountId, Status) => {
  try {
    console.log('FUNC GET POST BY STATUS');
    const post = await Post.find({});
    const data = post[0].Group;
    let account = '';
    let lstPost = [];
    if (data) {
      if (AccountId) account = await Account.findOne({ _id: AccountId });
      for (const i in data) {
        let group = data[i].Post;
        if (group) {
          //Lấy bài viết đã duyệt
          group = group.filter(
            (x) => String(x.Status) === Status && x.IsShow === true,
          );
          //Nếu account là user thì lọc bài theo account
          if (group.length > 0) {
            if (account) {
              group = group.filter((x) => x.AccountId === AccountId);
            }
            let tmp = { Id: data[i].Id, Post: group };
            lstPost.push(tmp);
          }
        }
      }
      if (lstPost.length <= 0) {
        return {
          msg: 'Không có bài viết nào!',
          statusCode: 300,
        };
      } else {
        return {
          msg: 'Lấy tất cả bài viết  thành công!',
          statusCode: 200,
          data: lstPost,
        };
      }
    } else !data;
    {
      return {
        msg: 'Không có bài viết nào',
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

//Tìm kiếm bài viết theo Title
const searchPost = async (req) => {
  let searchField = req.query.keyword;
  console.log(searchField);
  try {
    const Status = 'true';
    const AccountId = '';
    //Lấy các bài viết đã được duyệt
    const data = (await getPostbyStatus(AccountId, Status)).data;
    if (data) {
      let search = [];
      for (const i in data) {
        let temp = data[i].Post;

        //lọc ký tự đặc biệt, hoa thường, đưa về không dấu
        searchField = removeVN(searchField);
        let keyword = new RegExp(
          searchField.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
          'i',
        );
        let result = temp.filter((x) => removeVN(x.Title).match(keyword));

        //console.log(result);
        if (result.length > 0) {
          //Trả ra fullname
          let post = [];
          for (const i in result) {
            const accountId = result[i].AccountId;
            const account = await Account.findOne({ _id: accountId });
            const FullName = account.FullName;
            let tmp = { FullName, dataPost: result[i] };
            post.push(tmp);
          }
          let GroupId = data[i].Id;
          let lstPost = { GroupId, post };
          search.push(lstPost);
        }
      }
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
    } else {
      return {
        msg: 'Trang web hiện không có bài viết nào',
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
module.exports = {
  getPost,
  getPostbyGroupId,
  getPostbyCategory,
  searchPost,
  updatePost,
  getDetailPost,
  createPost,
  getPostbyStatus,
};
