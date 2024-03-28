exports.afterUploadImage = (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` })
}

exports.uploadPost = async (req, rest, next) => {
  try {

  } catch (e) {
    console.error(e)
    next(e)
  }
}