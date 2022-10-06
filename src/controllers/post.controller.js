const express = require("express");
const db = require("../models");

exports.createPost = async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user.id;
    const post = db.Post.create(data);
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
