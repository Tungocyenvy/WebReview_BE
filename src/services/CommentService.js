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
//get comment
const GetComment = async () => {
  try {
    const comment = await Comment.find({});
    // dem so luong cmt
    let countCmt = comment.length;
    for (var i = 0; i < comment.length; i++) {
      const replys = comment[i].Reply;
      countCmt += replys.length;
    }
    console.log(countCmt);
    //
    if (!comment) {
      return {
        msg: 'Không có bình luận nào!',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả bình luận thành công!',
        statusCode: 200,
        data: { comment },
      };
    }
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
  console.log('Email comment: ');
  console.log(Email);
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

    const newComment = new Comment({
      _id: randomId,
      Email: Email,
      Content,
      PostId,
      CreateAt: Date.now(),
    });
    console.log('newComment', newComment);
    const resSave = await newComment.save();
    console.log(resSave);
    if (resSave) {
      return {
        msg: 'Comment Thành công!',
        statusCode: 200,
        data: resSave,
      };
    } else {
      return {
        msg: 'Lỗi! Không thể comment',
        statusCode: 300,
      };
    }
  } catch (error) {
    return {
      msg: 'Lỗi trong quá trình comment',
      statusCode: 300,
    };
  }
};

//reply comment
const ReplyComment = async (token, body) => {
  let { Email } = token;
  console.log('Email reply: ');
  console.log(Email);
  let { Content, _id } = body;
  try {
    const comment = await Comment.findOne({ _id: _id });
    console.log(comment._id);
    var replys = comment.Reply;
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
    console.log('replys:' + replys);
    var content = {};
    content._id = randomId;
    content.Email = Email;
    content.Content = Content;
    content.CreateAt = Date.now();
    replys.push(content);
    comment.Reply = replys;
    await comment.save();
    return {
      msg: 'Reply comment successfully',
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: 'Reply comment failed',
      statusCode: 300,
    };
  }
};

const UpdateComment = async (token, body) => {
  let { Email } = token;
  console.log('Email comment: ');
  console.log(Email);
  let { Content, _id } = body;
  console.log(_id);
  try {
    const comment = await Comment.findOne({ _id: _id });
    if (comment.Email === Email) {
      comment._id = _id;
      comment.Email = Email;
      comment.Content = Content;
      comment.PostId = PostId;
      comment.CreateAt = Date.now();
      const resSave = await comment.save();
      console.log(resSave);
      if (resSave) {
        return {
          msg: 'Update comment Thành công!',
          statusCode: 200,
          data: resSave,
        };
      } else {
        return {
          msg: 'Lỗi! Không thể update',
          statusCode: 300,
        };
      }
    } else {
      return {
        msg: 'Email không trùng!',
        statusCode: 300,
      };
    }
  } catch (error) {
    return {
      msg: 'Lỗi trong quá trình update comment',
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
      msg: 'Update reply successfully',
      statusCode: 200,
      data: { comment },
    };
  } catch (error) {
    return {
      msg: 'Lỗi trong quá trình update comment',
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
    const dataComment = { _id: _id, Email: Email };
    const comment = await Comment.findOneAndDelete(dataComment);
    if (!comment) {
      return {
        msg: 'Delete failed',
        statusCode: 300,
      };
    }
    return {
      msg: 'Delete comment successfully',
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: 'Delete failed',
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
    if (comment) {
      const replys = comment.Reply;
      console.log(replys);
      if (replys.length > 0) {
        const new_replys = replys.filter((e) => {
          return e._id !== _id;
        });
        comment.Reply = new_replys;
        await comment.save();
        return {
          msg: 'Delete reply successfully',
          statusCode: 200,
        };
      }
      return {
        msg: 'Không có reply nào',
        statusCode: 300,
      };
    }
    return {
      msg: 'Không có comment nào',
      statusCode: 300,
    };
  } catch (error) {
    return {
      msg: 'Delete failed',
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
