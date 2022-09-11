const multer = require("multer");

const multerConfigs = multer({
  dest: "temp/",
  limits: { fieldSize: 8 * 1024 * 1024 },
});

module.exports = multerConfigs;
