// AWS-SDK
const AWS = require('aws-sdk');
const getImgBuffer = require('./Buffer');

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const s3Bucket = AWS.S3({ params: { Bucket: 'cal-app-user-imgs' } });

// PutObject function
const imageUpload = (path, buffer) => {
  const data = {
    Key: path,
    Body: buffer,
    ContentEncoding: contentEncoding,
    ContentType: contentType,
    ACL: acl
  }
  return new Promise((resolve, reject) => {
    s3Bucket.putObject(data, (err) => {
      if (err) {
        reject(err);
      } 
      else {
        resolve(s3Url + path)
      }
    })
  })
}
