const express = require("express");
const { createPost } = require("../controllers/post.controller");
const { validateToken } = require("../middlewares/validateToken.middleware");
const { validateUser } = require("../middlewares/validateUser.middleware");


const postRouter = express.Router();

postRouter.post("/post/create", validateToken, validateUser, createPost);

module.exports = postRouter;