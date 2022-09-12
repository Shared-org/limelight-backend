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

/**
 * @swagger
 * /api/forgotpassword:
 *   post:
 *     summary: Used for generating a token for forgot password
 *     description: Used for send an reset email request to user.
 *     responses:
 *     200:
 *       description: {Success Response}
 *
 */
userRouter.post("/forgotpassword", forgotPassword);

/**
 * @swagger
 * /api/resetPassword:
 *   put:
 *     summary: Used for update passord
 *     description: Used to update the password after forgetting.
 *     responses:
 *     200:
 *       description: {message: "string", token: "jwt token"}
 *
 */
userRouter.put("/resetPassword", resetPassword);

/**
 * @swagger
 * /api/uploadProfileImage:
 *   put:
 *     summary: Used for update profile image of the user
 *     description: Used to update the profile image of user.
 *     responses:
 *     200:
 *       description: {message:"string", image_url: "https://abc.png"}
 *
 */
userRouter.put(
  "/uploadProfileImage",
  validateToken,
  validateUser,
  multerConfigs.single("profileImage"),
  uploadProfileImage
);

/**
 * @swagger
 * /api/udpateUserInfo:
 *   put:
 *     summary: Used for update info of the user
 *     description: Used to update the info of user.
 *     responses:
 *     200:
 *       description: {message:"string", userObject}
 *
 */
userRouter.put("/udpateUserInfo", validateToken, validateUser, updateUserInfo);

module.exports = userRouter;
