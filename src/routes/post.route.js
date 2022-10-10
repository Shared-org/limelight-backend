const express = require("express");
const {
  createPost,
  getPost,
  deletePost,
  updatePost,
  getAllPosts,
} = require("../controllers/post.controller");
const multerConfigs = require("../middlewares/multer.middleware");
const { validateToken } = require("../middlewares/validateToken.middleware");
const { validateUser } = require("../middlewares/validateUser.middleware");

const postRouter = express.Router();

/**
 * @swagger
 * /api/post/create:
 *   post:
 *     summary: Used for creating new post
 *     description: Used for new post creation.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
postRouter.post(
  "/create",
  validateToken,
  validateUser,
  multerConfigs.single("userPost"),
  createPost
);

/**
 * @swagger
 * /api/post/get:
 *   get:
 *     summary: Used for getting a single post
 *     description: Used for getting a single post by id.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
postRouter.get("/get", validateToken, validateUser, getPost);

/**
 * @swagger
 * /api/post/delete:
 *   delete:
 *     summary: Used for delete post
 *     description: Used for delete a post.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
postRouter.delete("/delete", validateToken, validateUser, deletePost);

/**
 * @swagger
 * /api/post/update:
 *   put:
 *     summary: Used for update a post
 *     description: Used edit a post / update post.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
postRouter.put(
  "/update",
  validateToken,
  validateUser,
  multerConfigs.single("userPost"),
  updatePost
);

/**
 * @swagger
 * /api/post/getAllPost:
 *   get:
 *     summary: Used for get all post
 *     description: Used for get all post with pagintaion.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
postRouter.get("/getAllPost", validateToken, validateUser, getAllPosts);

module.exports = postRouter;
