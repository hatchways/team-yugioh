const express = require("express");
const router = express.Router();

const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const auth = require("../middleware/auth");
const db = require("../db/models");
const mongoose = require("mongoose");

// Set the region
AWS.config.update({ region: process.env.AWS_REGION });

const BUCKET = process.env.AWS_BUCKET_NAME;

// Create S3 service object
const s3 = new AWS.S3();

// AWS Params put into storage using Multer S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET,
    key: function (req, file, cb) {
      const FN = Date.now().toString() + ".png";
      cb(null, FN);
    },
  }),
}).single("file");

// Sends Storage Object to S3 Bucket
router.post("/api/image-upload", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).send("There was a server error with the upload");
    } else {
      if (req.file == undefined) {
        res.status(400).send("There was a error with your upload paramaters");
      } else {
        res.status(200).send({
          msg: "Your image was uploaded sucessfully",
          fileName: req.file.key,
        });
        const AwsUrl = `https://${BUCKET}.s3.amazonaws.com/${req.file.key}`;
        db.User.updateOne({ _id: req.userId }, { $set: { photoUrl: AwsUrl } })
          .then((response) => {
            res.send(response);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    }
  });
});

module.exports = router;
