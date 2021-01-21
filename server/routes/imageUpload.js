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
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '.png');
    },
  }),
}).single('file');

// Sends Storage Object to S3 Bucket
router.post('/api/image-upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).send('There was a server error with the upload')
    } else {
      if (req.file == undefined) {
        res.status(400).send('There was a error with your upload paramaters')
      } else {
        res.status(200).send('Your image was uploaded sucessfully')
      }
    }
  
  })
  
});

module.exports = router;
