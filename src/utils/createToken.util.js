const jwt = require("jsonwebtoken");
exports.createToken = async (userEmail) => {
  try {
    const token = await jwt.sign(
      {
        email: userEmail,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return token;
  } catch (error) {
    return error;
  }
};
