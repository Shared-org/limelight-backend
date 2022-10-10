const jwt = require("jsonwebtoken");
exports.createToken = async (userEmail, id) => {
  try {
    const token = await jwt.sign(
      {
        email: userEmail,
        id: id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return token;
  } catch (error) {
    return error;
  }
};
