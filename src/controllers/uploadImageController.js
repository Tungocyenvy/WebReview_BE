const cloudinary = require('./../services/cloudinary');

exports.uploadImagePost = async (req, res, next) => {
  if (!req.file) return next();

  const options = {
    folder: `review_web`,
    use_filename: true,
    overwrite: true,
    //filename_override: `${req.body.companyName}`,
  };
  const result = await cloudinary.uploadFile(req.file.path, options);
  //req.body.logo = result.secure_url;
  //req.body.publicIDLogo = result.public_id;
  next();
};
