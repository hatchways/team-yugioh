const express = require("express");
const db = require("../db/models");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE meeting
router.post("/api/event", auth, (req, res) => {
  if (req.body.duration) {
    db.EventType.create({ ...req.body, user_id: req.userId })
      .then((response) => res.send(response))
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  } else if (!req.body.duration) {
    res.status(400).send("Duration is required");
  }
});

// GET all meetings for user
router.get("/api/event", auth, (req, res) => {
  db.EventType.find({ user_id: req.userId })
    .then((data) => res.send(data))
    .catch((error) => {
      console.log(error.message);
      res.status(500).send(error);
    });
});

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "kaylee.nellie.nelson@gmail.com", // Change to your recipient
  from: "uesttser@gmail.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = router;
