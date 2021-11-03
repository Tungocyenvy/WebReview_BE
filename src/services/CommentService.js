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
      var randomId = getRandomString(6, base);
      const cmt = await Comment.findOne({ _id: randomId });
      if (!cmt) {
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
    await newComment.save();
    return {
      msg: 'Comment successfully',
      statusCode: 200,
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

    var reply = comment.Reply;
    //console.log('reply:'+reply);
    var content = {};
    content.Email = Email;
    content.Content = Content;
    content.CreateAt = Date.now();
    reply.push(content);
    comment.Reply = reply;
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
