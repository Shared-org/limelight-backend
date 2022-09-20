const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.validateToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) return res.status(400).json({
        message:"invalid token"
    })
    req.userEmail = decodedToken?.email;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Invalid token" });
  }
};
