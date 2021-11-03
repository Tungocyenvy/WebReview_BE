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
// const GetComment = async () => {
//   try {
//     const comment = await Comment.find({});
//     if (!comment) {
//       return {
//         msg: 'Không có bình luận nào!',
//         statusCode: 300,
//       };
//     } else {
//       return {
//         msg: 'Lấy tất cả bình luận thành công!',
//         statusCode: 200,
//         data: { comment },
//       };
//     }
//   } catch (error) {
//     return {
//       msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
//       statusCode: 300,
//     };
//   }
// }

//post comment
const PostComment = async (token, body) => {
  let { Email } = token;
  console.log('Email comment: ');
  console.log(Email);
  let { Content, PostId } = body;
  try {
    const base = '0123456789';
    let flag = true;
    var randomId = '';
    while (flag == true) {
      //kiểm tra trùng
      console.log(1);
      var randomId = getRandomString(6, base);
      const cmt = await Comment.findOne({ _id: randomId });
      if (!cmt) {
        console.log(2);
        flag = false;
      }
    }
    // console.log(randomId);
    // console.log(Email);
    // console.log(Content);
    // console.log(PostId);
    const newComment = new Comment({
      _id: randomId,
      Email: Email,
      Content,
      PostId,
      Reply: '',
      CreateAt: Date.now(),
    });
    console.log(typeof CreateAt);
    console.log('new:' + newComment);
    const data = await newComment.save();
    console.log(data);
    return {
      msg: 'Comment successfully',
      statusCode: 200,
      data: data,
    };
  } catch (error) {
    return {
      msg: 'Comment failed',
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

module.exports = { PostComment, ReplyComment };
