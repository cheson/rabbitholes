// Code here mostly taken from Sam Meech-Ward's video tutorial: https://www.youtube.com/watch?v=NZElg91l_ms

const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_SERVER_USER_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SERVER_USER_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// Uploads a file to S3
function uploadS3File(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3
    .upload(uploadParams)
    .promise()
    .then((result) => {
      return result.Location;
    });
}

module.exports = uploadS3File;
