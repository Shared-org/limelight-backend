const AWS = require("aws-sdk");
const AWS_S3_BUCKET_ID = process.env.AWS_S3_BUCKET_ID;
const AWS_S3_SECRET = process.env.AWS_S3_SECRET;
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

const s3 = new AWS.S3({
  accessKeyId: AWS_S3_BUCKET_ID,
  secretAccessKey: AWS_S3_SECRET,
});

module.exports = {
  s3,
  AWS_S3_BUCKET_NAME,
};
