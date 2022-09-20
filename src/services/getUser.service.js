const db = require("../models");

exports.getUser = async (email) => {
  try {
    const userDetails = await db.User.findOne({ where: { email: email } });
    if (!userDetails) {
      return false;
    }
    return userDetails;
  } catch (error) {
    return error;
  }
};
