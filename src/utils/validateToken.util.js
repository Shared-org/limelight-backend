const jwt = require("jsonwebtoken")

exports.validateToken = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET); 
}