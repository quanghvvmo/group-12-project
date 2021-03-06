const multer = require('multer');

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
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
}
var upload = multer({
  storage: storage,
  fileFilter: fileFilter
})


module.exports = { upload }