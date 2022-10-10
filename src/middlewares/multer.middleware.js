const multer = require("multer");
const path = require("path");

const multerConfigs = multer({
  dest: "temp/",
  limits: { fieldSize: 8 * 1024 * 1024 },
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.mov' && ext !== '.mp4') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  },
});

module.exports = multerConfigs;
