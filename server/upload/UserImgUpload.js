const AWS = require('aws-sdk');
const getImgBuffer = require('./getImgBuffer');

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const s3Bucket = AWS.S3({ params: { Bucket: 'cal-app-user-imgs' } });
