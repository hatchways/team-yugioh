const express = require('express');
const router = express.Router();

const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

// Set the region
AWS.config.update({ region: process.env.AWS_REGION });

// Create S3 service object
const s3 = new AWS.S3();

// AWS Params put into storage using Multer S3
const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  key: function (req, file, cb) {
    cb(null, Date.now().toString() + '.png');
  },
});

// Storage Object is wrapped by multer
const upload = multer({ storage });

// Sends Storage Object to S3 Bucket
router.post('/api/image-upload', upload.single('img'), (req, res) => {
  res.status(200).send('Image was uploaded to your AWS S3 Bucket!');
});

module.exports = router;
