const db = require("../models");

exports.getUser = async (email) => {
  try {
    const userDetails = await db.User.findOne({ where: { email } });
    if (!userDetails) {
      return {
        message: "user not found!!",
      };
    }
    return userDetails;
  } catch (error) {
    return error;
  }
};
