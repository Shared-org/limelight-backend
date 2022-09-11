const e = require("express");
const nodemailer = require("nodemailer");
const { AWS_S3_BUCKET_NAME } = require("../configs/aws-s3.config");
const { sendEmail } = require("../configs/nodemailer.config");
const db = require("../models");
const { fileUpload } = require("../services/fileUpload.service");
const { getUser } = require("../services/getUser.service");
const { mailTemplate } = require("../static/mail.static");
const { createToken } = require("../utils/createToken.util");
const { emailFormat } = require("../utils/emailFormat.util");
const { validateToken } = require("../utils/validateToken.util");

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
      message: "Internal server error",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const data = req.body;
    const token = createToken(data.email);
    sendEmail(data.email, token, mailTemplate)
      .then(() => {
        return res.status(200).json({
          message: "Email sent",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          message: error,
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const data = req.body;
    const verify = await validateToken(data.token);
    if (verify) {
      const updatePassword = await db.User.update(
        {
          password: data.password,
        },
        {
          where: {
            email: verify.email,
          },
          individualHooks: true,
        }
      );
      if (updatePassword) {
        return res.status(200).json({
          message: "password updated",
        });
      }
    } else {
      return res.status(400).json({
        message: "Invalid token",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    const data = req.body;
    const files = req.file;
    if (!files && !data) {
      return res.status(400).json({
        message: "no files/email found",
      });
    }
    const fileUploadResults = await fileUpload(files, AWS_S3_BUCKET_NAME);
    if (!fileUploadResults) {
      return res.status(400).json({
        message: "something went wrong while uploading the image",
      });
    }
    const updateImageURL = await db.User.update(
      {
        profile_image: fileUploadResults.Location,
      },
      {
        where: {
          email: data.email,
        },
      }
    );
    const currentUser = await getUser(data.email);
    currentUser.password = undefined;
    if (updateImageURL && currentUser) {
      return res.status(200).json({
        message: "image uploaded successfully",
        currentUser,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
