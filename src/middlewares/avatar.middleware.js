const multer = require('multer');
const mimeType = require('../const/imageType.enum');
//define storage of avatar in server
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

//validation for file input
const fileFilter = (req, file, cb, res) => {
  if (mimeType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Invalid type of input image'));
  }
}
var upload = multer({
  storage: storage,
  fileFilter: fileFilter,
})


module.exports = { upload }