const express = require("express");
const { signup, forgotPassword, resetPassword } = require("../controllers/user.controller");

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
module.exports = userRouter;
