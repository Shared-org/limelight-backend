const express = require("express");
const {
  createPost,
  getPost,
  deletePost,
  updatePost,
  getAllPosts,
  likeDislikePost,
  getUserPost,
  createComment,
  getAllComment,
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

/**
 * @swagger
 * /api/post/like-dislike:
 *   put:
 *     summary: Used for make a like to the post
 *     description: Used for like and dislike the post.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
postRouter.put("/like-dislike", validateToken, validateUser, likeDislikePost);

/**
 * @swagger
 * /api/post/userPost:
 *   get:
 *     summary: Used for get all user posts
 *     description: Used for get all post that are done by a user.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
postRouter.get("/userPost", validateToken, validateUser, getUserPost);

/**
 * @swagger
 * /api/post/comment:
 *   post:
 *     summary: Used for comment on a post
 *     description: Used for comment on any post by current user.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
 postRouter.post("/comment", validateToken, validateUser, createComment);

 /**
 * @swagger
 * /api/post/comment:
 *   get:
 *     summary: Used for get comment of a post
 *     description: Used for get all comment on any post by current user.
 *     responses:
 *     200:
 *       description: Success Response
 *
 */
  postRouter.get("/comment/:post_id", validateToken, validateUser, getAllComment);


module.exports = postRouter;
