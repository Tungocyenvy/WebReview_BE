const uploadImageToCloudinary = async (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  let url = req.file.path;
  let msg = 'tải lên thành công';
  let funcNum = 1;

  // res
  //   .status(201)
  //   .send(
  //     "<script>window.parent.CKEDITOR.tools.callFunction(' " +
  //       funcNum +
  //       " ' , ' " +
  //       url +
  //       " ' , ' " +
  //       msg +
  //       "  '); </script>",
  //   );
  res.status(200).json({
    uploaded: true,
    url: url,
  });
};

module.exports = { uploadImageToCloudinary };
