const Comment = require('../models/commentModel');
const Account = require('../models/accountModel');

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const getRandomString = (length, base) => {
  let result = '';
  const baseLength = base.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomInt(0, baseLength);
    result += base[randomIndex];
  }
  return 'CMT' + result;
};
//get comment theo postId
const GetComment = async (body) => {
  let { PostId } = body;
  console.log(PostId);
  try {
    let comment = await Comment.find({ PostId: PostId });
    if (comment.length === 0) {
      comment = {};
      return {
        msg: 'Không có bình luận nào!',
        statusCode: 300,
        data: { comment },
      };
    }
    // dem so luong cmt
    let countCmt = comment.length;
    for (var i = 0; i < comment.length; i++) {
      const replys = comment[i].Reply;
      countCmt += replys.length;
    }
    console.log(countCmt);
    // lấy avatar ng cmt
    for (var i in comment) {
      const data = comment[i];
      const accountId = data.AccountId;
      const account = await Account.findOne({ _id: accountId });
      let avatar = account.Avatar;
      let FullName = account.FullName;

      var replys = data.Reply;
      //console.log(replys);
      //console.log(replys[1]);
      let result = [];
      for (var k in replys) {
        const reply = replys[k];
        //console.log('reply: ' + reply);
        const accountId1 = reply.AccountId; //nhớ sưa chữ email lại nha :v
        const account1 = await Account.findOne({ _id: accountId1 });
        let avatar1 = account1.Avatar;
        //let email = account1.Email;

        let objReply = {};
        objReply._id = reply._id;
        objReply.Avatar = avatar1;
        objReply.FullName = account1.FullName;
        objReply.Content = reply.Content;
        objReply.CreateAt = reply.CreateAt;

        // let temp1 = { reply, avatar1 };
        // console.log(temp1);

        //replys[k] = temp1;
        result.push(objReply);
        //console.log(result);
      }
      //console.log(result);
      let dataCmt = {};
      dataCmt._id = data._id;
      dataCmt.Avatar = avatar;
      dataCmt.FullName = FullName;
      dataCmt.Content = data.Content;
      dataCmt.CreateAt = data.CreateAt;
      dataCmt.Reply = result;

      // data.Reply = result;
      // console.log(data.Reply)
      // let temp = { data, avatar };
      comment[i] = dataCmt;
      //console.log(comment[i]);
    }

    // lấy avatar ng reply
    // for (var l in comment) {
    //   const data = comment[l];
    //   console.log(data.Reply);

    // }
    return {
      msg: 'Lấy tất cả bình luận thành công!',
      statusCode: 200,
      data: { comment },
    };
  } catch (error) {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//post comment
const PostComment = async (token, body) => {
  let { Email } = token;
  //console.log('Email comment: ');
  //console.log(Email);
  let { Content, PostId } = body;
  try {
    const base = '0123456789';
    let flag = true;
    let randomId;
    while (flag == true) {
      //kiểm tra trùng
      console.log(1);
      randomId = getRandomString(6, base);
      const cmt = await Comment.findOne({ _id: randomId });
      if (!cmt) {
        console.log(2);
        flag = false;
      }
    }
    const account = await Account.findOne({ Email: Email });
    const accountId = account._id;
    //console.log(accountId);
    const newComment = new Comment({
      _id: randomId,
      AccountId: accountId,
      Content,
      PostId,
      CreateAt: Date.now(),
    });
    console.log('newComment', newComment);
    const resSave = await newComment.save();
    console.log(resSave);
    if (resSave) {
      return {
        msg: 'Bình luận Thành công!',
        statusCode: 200,
        data: resSave,
      };
    }
    resSave = {};
    return {
      msg: 'Lỗi! Không thể bình luận',
      statusCode: 300,
      data: resSave,
    };
  } catch (error) {
    return {
      msg: 'Lỗi trong quá trình bình luận',
      statusCode: 300,
    };
  }
};

//reply comment
const ReplyComment = async (token, body) => {
  let { Email } = token;
  //console.log('Email reply: ');
  //console.log(Email);
  let { Content, _id } = body;
  try {
    const comment = await Comment.findOne({ _id: _id });
    if (!comment) {
      comment = {};
      return {
        msg: 'Không tìm thấy bình luận',
        statusCode: 300,
        data: comment,
      };
    }
    //console.log(comment._id);
    var replys = comment.Reply;
    //console.log(replys);
    const base = '0123456789';
    let flag = true;
    var randomId = '';
    while (flag == true) {
      //kiểm tra trùng
      var randomId = getRandomString(7, base);
      var reply = replys.find((e) => {
        return e._id === randomId;
      });
      if (!reply) {
        flag = false;
      }
    }
    const account = await Account.findOne({ Email: Email });
    const accountId = account._id;
    console.log('replys:' + replys);
    var content = {};
    content._id = randomId;
    content.AccountId = accountId;
    content.Content = Content;
    content.CreateAt = Date.now();
    replys.push(content);
    comment.Reply = replys;
    await comment.save();
    return {
      msg: 'Trả lời bình luận thành công',
      statusCode: 200,
      data: comment,
    };
  } catch (error) {
    return {
      msg: 'Lỗi trong quá trình trả lời bình luận',
      statusCode: 300,
    };
  }
};

const UpdateComment = async (token, body) => {
  let { Email } = token;
  console.log('Email comment: ');
  console.log(Email);
  let { Content, _id } = body;
  //console.log(_id);
  try {
    const account = await Account.findOne({ Email: Email });
    const accountId = account._id;
    const comment = await Comment.findOne({ _id: _id, AccountId: accountId });
    if (!comment) {
      comment = {};
      return {
        msg: 'Không tìm thấy bình luận',
        statusCode: 300,
        data: { comment },
      };
    }
    //console.log(comment);
    comment.Content = Content;
    comment.CreateAt = Date.now();
    const resSave = await comment.save();
    console.log(resSave);
    if (!resSave) {
      resSave = {};
      return {
        msg: 'Lỗi! Không thể chỉnh sửa bình luận',
        statusCode: 300,
        data: resSave,
      };
    }
    return {
      msg: 'Chỉnh sửa bình luận Thành công!',
      statusCode: 200,
      data: resSave,
    };
  } catch (error) {
    return {
      msg: 'Lỗi trong quá trình chỉnh sửa bình luận',
      statusCode: 300,
    };
  }
};

const UpdateReply = async (token, body) => {
  let { Email } = token;
  console.log('Email comment: ');
  console.log(Email);
  let { Content, _id, idComment } = body;
  //console.log(_id);
  try {
    const comment = await Comment.findOne({ _id: idComment });
    if (!comment) {
      comment = {};
      return {
        msg: 'Không tìm thấy comment',
        statusCode: 300,
        data: { comment },
      };
    }
    var replys = comment.Reply;

    for (var i in replys) {
      if (replys[i]._id === _id) {
        replys[i].Content = Content;
        replys[i].CreateAt = Date.now();
      }
    }
    console.log(replys);
    comment.Reply = replys;
    await comment.save();
    return {
      msg: 'Chỉnh sửa bình luận thành công',
      statusCode: 200,
      data: { comment },
    };
  } catch (error) {
    return {
      msg: 'Lỗi trong quá trình chỉnh sửa bình luận',
      statusCode: 300,
    };
  }
};

const DeleteComment = async (token, body) => {
  let { Email } = token;
  console.log('Email comment: ');
  console.log(Email);
  let { _id } = body;
  try {
    const account = await Account.findOne({ Email: Email });
    const accountId = account._id;
    const dataComment = { _id: _id, AccountId: accountId };
    const comment = await Comment.findOneAndDelete(dataComment);
    if (!comment) {
      comment = {};
      return {
        msg: 'Không tìm thấy comment',
        statusCode: 300,
        data: { comment },
      };
    }
    return {
      msg: 'Xóa bình luận thành công',
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: 'Lỗi trong quá trình xóa bình luận',
      statusCode: 300,
    };
  }
};

const DeleteReply = async (token, body) => {
  let { Email } = token;
  console.log('Email comment: ');
  console.log(Email);
  let { _id, idComment } = body;
  try {
    const comment = await Comment.findOne({ _id: idComment });
    console.log(comment);
    if (!comment) {
      comment = {};
      return {
        msg: 'Không tìm thấy comment',
        statusCode: 300,
        data: { comment },
      };
    }
    const replys = comment.Reply;
    console.log(replys);
    if (replys.length > 0) {
      const new_replys = replys.filter((e) => {
        return e._id !== _id;
      });
      comment.Reply = new_replys;
      await comment.save();
      return {
        msg: 'Xóa bình luận thành công',
        statusCode: 200,
        data: comment,
      };
    }
    return {
      msg: 'Không có reply nào',
      statusCode: 300,
    };
  } catch (error) {
    return {
      msg: 'Lỗi trong quá trình xóa bình luận',
      statusCode: 300,
    };
  }
};

module.exports = {
  PostComment,
  ReplyComment,
  GetComment,
  UpdateComment,
  UpdateReply,
  DeleteComment,
  DeleteReply,
};
