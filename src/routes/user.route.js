const express = require("express");
const {
  signup,
  forgotPassword,
  resetPassword,
  uploadProfileImage,
} = require("../controllers/user.controller");
const multerConfigs = require("../middlewares/multer.middleware");

const userRouter = express.Router();

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Used for creating new user
 *     description: Used for user signup new user creation.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */

userRouter.post("/signup", signup);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.put("/resetPassword", resetPassword);
userRouter.put("/uploadProfileImage", multerConfigs.single("profileImage"), uploadProfileImage);

module.exports = userRouter;
