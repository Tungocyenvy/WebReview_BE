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

    for (const k in review) {
      if (!review[k].Status) {
        review.remove(review[k]);
      }
    }
    //const review = await data.find ({Id});
    console.log(review);
    if (!review) {
      return {
        msg: 'Không có bài review nào!',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả bài review thành công!',
        statusCode: 200,
        data: review,
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

    for (const k in experience) {
      if (!experience[k].Status) {
        experience.remove(experience[k]);
      }
    }
    console.log(experience);
    if (!experience) {
      return {
        msg: 'Không có bài chia sẻ kinh nghiệm nào!',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả bài chia sẻ kinh nghiệm thành công!',
        statusCode: 200,
        data: experience,
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
};
