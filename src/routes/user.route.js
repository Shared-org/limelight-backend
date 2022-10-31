const express = require("express");
const {
  signup,
  forgotPassword,
  resetPassword,
  uploadProfileImage,
  updateUserInfo,
  signIn,
  getAllUser,
  getUser
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
 *       description: Success Response
 *
 */
userRouter.put("/udpateUserInfo", validateToken, validateUser, updateUserInfo);

/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: Used for signin
 *     description: Used to user signin.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
userRouter.post("/signin", signIn);

/**
 * @swagger
 * /api/getAllUser:
 *   put:
 *     summary: Used for get all user
 *     description: Used to get all users from user table.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
userRouter.get("/getAllUser", validateToken, getAllUser);

/**
 * @swagger
 * /api/getUser:
 *   put:
 *     summary: Used for get  user
 *     description: Used to get user from user table.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
 userRouter.get("/getUser", validateToken, getUser);

module.exports = userRouter;
