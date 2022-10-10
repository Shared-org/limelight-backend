const db = require("../models");
const { getUser } = require("../services/getUser.service");

exports.validateUser = async (req, res, next) => {
  try {
    const email = req.userEmail || req.body.email;
    const user = await getUser(email);
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(400).json({ message: "Invalid user" });
    }
  } catch (error) {
    return res.status(500).json({ message: "internal middleware error" });
  }
};
