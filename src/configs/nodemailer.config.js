const nodemailer = require("nodemailer");

exports.sendEmail = async (email, token, mailTemplate) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_MAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Reset Password Request",
    html: mailTemplate(token),
  });
};
