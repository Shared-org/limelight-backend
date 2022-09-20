const { s3 } = require("../configs/aws-s3.config");
const fs = require("fs");
exports.fileUpload = async (file, BUCKET_NAME) => {
  try {
    const blob = fs.createReadStream(file.path);
    const uploadedImage = await s3
      .upload({
        ACL: "public-read",
        Bucket: BUCKET_NAME,
        Key: file.originalFilename,
        Body: blob,
        Key: `userAvatar/${file.originalname}`,
      })
      .promise();
    // * MAKING "/temp" EMPTY
    if (uploadedImage) fs.unlinkSync(file.path);
    return uploadedImage;
  } catch (error) {
    return error;
  }
};
