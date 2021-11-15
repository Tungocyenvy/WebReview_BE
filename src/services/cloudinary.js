const cloudinary = require('cloudinary').v2;
const configuration = require('./../config/cloudinaryConfiguration');

//const AppError = require('./../utils/appError');
cloudinary.config(configuration);

exports.uploadFile = async (file, options) => {
  try {
    const result = await cloudinary.uploader.upload(file, options);
    return result;
  } catch (err) {
    console.log(err);
    //return new AppError('Có quá trình xảy ra trong quá trình upload');
  }
};
