const uploadImageToCloudinary = async (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  res.json({ location: req.file.path });
};

module.exports = { uploadImageToCloudinary };
