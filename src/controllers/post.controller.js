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
    const data = req.body;
    const post = await db.Post.findByPk(data.id);
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
    const posts = await db.Post.findAndCountAll({
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
      posts: posts?.rows,
      count: posts?.count,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};
