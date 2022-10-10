const { s3 } = require("../configs/aws-s3.config");
const fs = require("fs");
exports.fileUpload = async (file, BUCKET_NAME, folderName) => {
  try {
    const blob = fs.createReadStream(file.path);
    const uploadedImage = await s3
      .upload({
        ACL: "public-read",
        Bucket: BUCKET_NAME,
        Key: file.originalFilename,
        Body: blob,
        Key: `${folderName}/${file.originalname + new Date()}`,
      })
      .promise();
    // * MAKING "/temp" EMPTY
    if (uploadedImage) fs.unlinkSync(file.path);
    return uploadedImage;
  } catch (error) {
    return error;
  }
};
