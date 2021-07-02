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

// Convert S3 link to a domain that is fronted by Cloudflare to take advantage of caching.
// From: https://s3.us-west-2.amazonaws.com/static.rabbitholes.ooo/xyz
// To: https://static.rabbitholes.ooo/xyz
function s3ToCloudflareURL(s3URL) {
  return s3URL.replace("https://s3.us-west-2.amazonaws.com/", "https://");
}

function cloudflareURLToS3Key(cloudflareURL) {
  return cloudflareURL.replace("https://static.rabbitholes.ooo/", "");
}

// Deletes associated S3 resources upon flow/user deletion
function deleteS3Files(cloudflareURLs) {
  const s3Keys = cloudflareURLs.map((url) => {
    return { Key: cloudflareURLToS3Key(url) };
  });
  const deleteParams = {
    Bucket: bucketName,
    Delete: {
      Objects: s3Keys,
    },
  };
  s3.deleteObjects(deleteParams, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

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
      // Delete file from local fs after upload success.
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      return s3ToCloudflareURL(result.Location);
    });
}

exports.uploadS3File = uploadS3File;
exports.deleteS3Files = deleteS3Files;
