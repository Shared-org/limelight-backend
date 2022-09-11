const express = require("express");
const {
  signup,
  forgotPassword,
  resetPassword,
  uploadProfileImage,
  updateUserInfo,
} = require("../controllers/user.controller");
const multerConfigs = require("../middlewares/multer.middleware");
const { validateUser } = require("../middlewares/validateUser.middleware");
const { validateToken } = require("../middlewares/validateToken.middleware");

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
userRouter.put(
  "/uploadProfileImage",
  validateToken,
  validateUser,
  multerConfigs.single("profileImage"),
  uploadProfileImage
);
userRouter.put("/udpateUserInfo", validateToken, validateUser, updateUserInfo);

module.exports = userRouter;
