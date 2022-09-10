const jwt = require("jsonwebtoken")

exports.validateToken = async (token) => {
    console.log("inside validate token")
    return jwt.verify(token, process.env.JWT_SECRET); 
}