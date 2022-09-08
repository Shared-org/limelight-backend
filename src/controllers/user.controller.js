const db = require("../models");
const { createToken } = require("../utils/createToken.util");
const { emailFormat } = require("../utils/emailFormat.util");

exports.signup = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    if (!data.email || !data.password || !data.firstName || !data.lastName) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }
    if (!emailFormat(data.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const checkExistingUser = await db.User.findOne({
      where: {
        email: data.email,
      },
      attributes: ["email"],
    });

    if (checkExistingUser) {
      return res.status(200).json({
        message: "User already exist",
      });
    }

    const createUser = await db.User.create(data);
    const token = await createToken(data.email);

    if (createUser) {
      createUser.password = undefined;
      return res.status(201).json({
        message: "Signed up successfully",
        data: createUser,
        token: token,
      });
    } else {
      return res.status(400).json({
        message: "something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
