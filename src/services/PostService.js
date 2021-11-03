const { createToken } = require('./jwtService');
const bcrypt = require('bcrypt');
const Post = require('../models/postModel');
const rand = require('random');
const { SendMailVetify } = require('./SendMailService');
const { findOneAndRemove } = require('../models/postModel');

//REVIEW
// get Post review
const getReview = async (body) => {
  try {
    const Id = 'Review';
    const post = await Post.find({});
    const data = post[0].Group;
    let review;
    for (const i in data) {
      if (data[i].Id == Id) {
        review = data[i];
        break;
      }
    }
    review = review.Post;

    //Lấy bài viết đã duyệt
    for (const k in review) {
      if (!review[k].Status) {
        review.remove(review[k]);
      }
    }
    console.log('review:' + review);

    //lấy ra 15 bài review mới nhất
    let topreview = Array.from(review);
    topreview.reverse();
    topreview = topreview.slice(0, 16);
    console.log('Index:' + topreview);

    if (!review) {
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

//EXPERIENCE
// get Post Experience
const getExperience = async (body) => {
  try {
    const Id = 'Experience';
    const post = await Post.find({});
    const data = post[0].Group;
    let experience;
    for (const i in data) {
      if (data[i].Id == Id) {
        experience = data[i];
        break;
      }
    }

    experience = experience.Post;

    //Lấy bài chia sẻ đã duyệt
    for (const k in experience) {
      if (!experience[k].Status) {
        experience.remove(experience[k]);
      }
    }
    console.log('all:' + experience);

    //Lấy ra 5 bài kinh nghiệm mới nhất
    let topexp = Array.from(experience);
    topexp.reverse();
    topexp = topexp.slice(0, 6);

    console.log('Index:' + topexp);

    if (!experience) {
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

//FORUM
// get Post Forum
const getForum = async (body) => {
  try {
    const Id = 'Forum';
    const post = await Post.find({});
    const data = post[0].Group;
    let forum;
    for (const i in data) {
      if (data[i].Id == Id) {
        forum = data[i];
        break;
      }
    }

    forum = forum.Post;

    //Lấy bài đăng trong forum đã duyệt
    for (const k in forum) {
      if (!forum[k].Status) {
        forum.remove(forum[k]);
      }
    }
    console.log('all:' + forum);

    //Lấy ra 5 bài trong forum mới nhất
    let topfrm = Array.from(forum);
    topfrm.reverse();
    topfrm = topfrm.slice(0, 6);

    console.log('Index:' + topfrm);

    if (!forum) {
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

module.exports = {
  getReview,
  getExperience,
  getForum,
};
