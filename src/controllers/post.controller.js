const express = require("express");
const db = require("../models");
const { fileUpload } = require("../services/fileUpload.service");
const { isFileImage } = require("../utils/isFileImage.util");

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

//CREATE POST
exports.createPost = async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user.id;
    const files = req.file;
    if (
      files &&
      (files.originalname.includes(".png") ||
        files.originalname.includes(".jpg") ||
        files.originalname.includes(".gif") ||
        files.originalname.includes(".jpeg") ||
        files.originalname.includes(".mov") ||
        files.originalname.includes(".mp4"))
    ) {
      console.log("bfore");
      const fileUploadResults = await fileUpload(
        files,
        AWS_S3_BUCKET_NAME,
        "userPost"
      );
      console.log("after");
      if (!fileUploadResults) {
        return res.status(400).json({
          message: "something went wrong while uploading the image",
        });
      } else {
        if (isFileImage(fileUploadResults.Location)) {
          data["content_image"] = fileUploadResults.Location;
        } else {
          data["content_video"] = fileUploadResults.Location;
        }
      }
    }
    const post = await db.Post.create(data);
    if (post) {
      return res.status(201).json({
        message: "post created successfully",
        post: post,
      });
    } else {
      return res.status(400).json({
        error: "Something went wrong while creating the post!!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

//GET SINGLE POST
exports.getPost = async (req, res) => {
  try {
    const data = req.query;
    const post = await db.Post.findOne({
      include: [
        {
          model: db.Like,
          attributes: ["user_id"],
        },
      ],
      where: {
        id: data.postId,
      },
    });
    if (!post) {
      return res.status(400).json({
        error: "Something went wrong while retriving the post!!",
      });
    }
    return res.status(200).json({
      message: "post retrived successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// DELETE A POST
exports.deletePost = async (req, res) => {
  try {
    const data = req.body;
    const post = await db.Post.findByPk(data.id);
    if (!post) {
      return res.status(400).json({
        error: "post not found",
      });
    }
    if (post.userId === req.userId) {
      const deletePost = await db.Post.destroy({
        where: {
          id: data.id,
        },
      });
      if (deletePost) {
        return res.status(200).json({
          message: "post deleted successfully",
          data: deletePost,
        });
      }
      return res.status(400).json({
        error: "something went wrong while deleting the post",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  try {
    const data = req.body;
    data["edited"] = true;
    const post = await db.Post.findByPk(data.id);
    if (!post) {
      return res.status(400).json({
        error: "post not found",
      });
    }

    const files = req.file;
    if (
      files &&
      (files.originalname.includes(".png") ||
        files.originalname.includes(".jpg") ||
        files.originalname.includes(".gif") ||
        files.originalname.includes(".jpeg") ||
        files.originalname.includes(".mov") ||
        files.originalname.includes(".mp4"))
    ) {
      const fileUploadResults = await fileUpload(
        files,
        AWS_S3_BUCKET_NAME,
        "userPost"
      );
      if (!fileUploadResults) {
        return res.status(400).json({
          message: "something went wrong while uploading the image",
        });
      } else {
        if (isFileImage(fileUploadResults.Location)) {
          data["content_image"] = fileUploadResults.Location;
        } else {
          data["content_video"] = fileUploadResults.Location;
        }
      }
    }

    if (post.userId === req.userId) {
      const updatedPost = await db.Post.update(data, {
        where: {
          id: data.id,
        },
      });
      if (updatedPost) {
        return res.status(200).json({
          message: "post updated successfully",
          data: updatedPost,
        });
      }
      return res.status(400).json({
        error: "something went wrong while deleting the post",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

// GET POSTS
exports.getAllPosts = async (req, res) => {
  try {
    const query = req.query;
    let page = Number.parseInt(query.page);
    const size = 20;
    if (!page || Number.isNaN(page)) {
      page = 0;
    }
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.Like,
          attributes: ["user_id"],
        },
      ],
      limit: size,
      offset: page * size,
    });
    if (!posts) {
      return res.status(400).json({
        message: "something went wrong while retriving posts",
      });
    }
    return res.status(200).json({
      message: "successfully retrived posts",
      posts: posts,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

// LIKE POST
exports.likeDislikePost = async (req, res) => {
  try {
    const data = req.body;
    const post = await db.Post.findByPk(data.postId);
    if (!post) {
      return res.status(400).json({
        message: "something went wrong while retriving post",
      });
    }
    const likedPost = await db.Like.findOne({
      where: {
        user_id: req.userId,
        post_id: data.postId,
      },
    });
    if (likedPost) {
      const disLike = await db.Like.destroy({
        where: {
          post_id: data.postId,
          user_id: req.userId,
        },
      });
      if (!disLike) {
        return res.status(400).json({
          message: "something went wrong while disliking post",
        });
      }
      return res.status(200).json({
        message: "Post disliked successfully",
        data: disLike,
      });
    } else {
      const like = await db.Like.create({
        post_id: data.postId,
        user_id: req.userId,
      });
      if (!like) {
        return res.status(400).json({
          message: "something went wrong while liking the post",
        });
      }
      return res.status(200).json({
        message: "Post liked successfully",
        data: like,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// GET ALL USER POST
exports.getUserPost = async (req, res) => {
  try {
    const data = req.body;
    const userPost = await db.Post.findAll({
      include: [
        {
          model: db.Like,
          attributes: ["user_id"],
        },
      ],
      where: {
        userId: data.userId,
      },
    });
    if (!userPost) {
      return res.status(400).json({
        message: "something went wrong while retriving posts",
      });
    }
    return res.status(200).json({
      message: "successfully retrived posts",
      posts: userPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

//COMMENT ON POST
exports.createComment = async (req, res) => {
  const data = req.body;
  data["user_id"] = req.userId;
  try {
    if (!data.post_id || !data.content) {
      return res.status(400).json({
        message: "something went wrong while doing comment",
      });
    }
    const comment = await db.Comment.create(data);
    if (!comment) {
      return res.status(400).json({
        message: "something went wrong while doing comment",
      });
    }
    return res.status(201).json({
      message: "comment added successfully",
      comment: comment,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

//GET ALL COMMENTS ON POST
exports.getAllComment = async (req, res) => {
  const params = req.params;
  try {
    if (!params.post_id) {
      return res.status(400).json({
        message: "something went wrong while getting comments",
      });
    }
    const comments = await db.Comment.findAll({
      hierarchy: true,
      include: [
        {
          model: db.User,
          attributes: ["id", "firstName", "lastName", "profile_image", "email"],
        },
      ],
      where: {
        post_id: params.post_id,
      },
      // TODO: Add pagination here
    });
    if (!comments) {
      return res.status(400).json({
        message: "something went wrong while fetching comments",
      });
    }
    return res.status(200).json({
      message: "comment fetched successfully",
      comment: comments,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
