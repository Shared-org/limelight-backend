const express = require("express");
const db = require("../models");

exports.follow = async (req, res) => {
  try {
    const data = req.body;
    if (!data.user_id || !req.userId) {
      return res.status(400).json({
        message: "something went wrong while following the user",
      });
    }
    const followed = await db.Connection.findOrCreate({
      where: {
        user_id: data.user_id,
        follower_id: req.userId,
      },
      defaults: {
        user_id: data.user_id,
        follower_id: req.userId,
      },
    });
    if (!followed[1]) {
      return res.status(200).json({
        message: "user already followed",
        data: followed,
      });
    }
    return res.status(201).json({
      message: "user followed successully",
      data: followed,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.unFollow = async (req, res) => {
  try {
    const data = req.body;
    if (!data.user_id || !req.userId) {
      return res.status(400).json({
        message: "something went wrong while unfollowing the user",
      });
    }
    const userUnfollowed = await db.Connection.destroy({
      where: {
        user_id: data.user_id,
        follower_id: req.userId,
      },
    });
    if (!userUnfollowed) {
      return res.status(400).json({
        message: "something went wrong while unfollowing the user",
      });
    }
    return res.status(200).json({
      message: "user unfollowed successully",
      data: userUnfollowed,
      unFollowed: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const data = req.body;
    if (!data.userId) {
      return res.status(400).json({
        message: "invalid userId",
      });
    }
    const followers = await db.Connection.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "firstName", "lastName", "email", "profile_image"],
        },
      ],
      where: {
        user_id: data.userId,
      },
    });
    if (!followers) {
      return res.status(400).json({
        message: "something went wrong while fetching followers",
      });
    }
    return res.status(200).json({
      message: "followers fetched successfully",
      data: followers,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const data = req.body;
    if (!data.userId) {
      return res.status(400).json({
        message: "invalid userId",
      });
    }
    const following = await db.Connection.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "firstName", "lastName", "email", "profile_image"],
        },
      ],
      where: {
        follower_id: data.userId,
      },
    });
    if (!following) {
      return res.status(400).json({
        message: "something went wrong while fetching following",
      });
    }
    return res.status(200).json({
      message: "following fetched successfully",
      data: following,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
