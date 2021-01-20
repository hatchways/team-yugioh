const express = require("express");
const auth = require("../middleware/auth");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

// Send confirmation email
router.post("/api/email", auth, (req, res) => {
  const msg = {
    to: req.body.email,
    // TODO: make project email/maybe also domain?
    from: "uesttser@gmail.com",
    // TODO: add in name and/or email of user, what appountment/event type was booked
    // TODO: write good copy
    subject: "Someone Has Booked an Appointment with you",
    text:
      "Someone has booked your appointment. Log in to Calendapp to make any updates.",
    html: `<h1>Someone has booked your appointment</h1> 
    <p>Log in to Calendapp to make any updates.</p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.send("email sent!");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

module.exports = router;
