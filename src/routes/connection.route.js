const express = require("express");
const {
  follow,
  unFollow,
  getFollowers,
  getFollowing,
} = require("../controllers/connection.controller");
const { validateToken } = require("../middlewares/validateToken.middleware");
const { validateUser } = require("../middlewares/validateUser.middleware");
const connectionRouter = express.Router();

/**
 * @swagger
 * /api/connection/follow:
 *   post:
 *     summary: Used for following a user
 *     description: Used for follow a new user.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
connectionRouter.post("/follow", validateToken, validateUser, follow);

/**
 * @swagger
 * /api/connection/unfollow:
 *   delete:
 *     summary: Used for unfollowing a user
 *     description: Used for unfollow a user.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
connectionRouter.delete("/unfollow", validateToken, validateUser, unFollow);

/**
 * @swagger
 * /api/connection/getFollowers:
 *   get:
 *     summary: Used for get follower of a user
 *     description: Used for get follower of a user.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
connectionRouter.get(
  "/getFollowers",
  validateToken,
  validateUser,
  getFollowers
);

/**
 * @swagger
 * /api/connection/getFollowing:
 *   get:
 *     summary: Used for get following of a user
 *     description: Used for get following of a user.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
connectionRouter.get(
  "/getFollowing",
  validateToken,
  validateUser,
  getFollowing
);

module.exports = connectionRouter;
