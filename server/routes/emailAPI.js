const express = require("express");
const sgMail = require("@sendgrid/mail");
const fs = require("fs");
const confirmEmail = fs.readFileSync(
  "./routes/assets/confirmEmail.html",
  "utf8"
);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

// Send confirmation email
router.post("/api/email", (req, res) => {
  const { eventName, time, host, appointmentId } = req.body;
  const msg = {
    to: req.body.email,
    from: "calendappygo@gmail.com",
    subject: `Your Appointment with ${host} Has Been Booked!`,
    text: `Your ${eventName} appointment at ${time} has been booked with ${host}.`,
    html: confirmEmail,
    headers: {
      eventName: eventName,
      time: time,
      host: host,
      appointmentId: appointmentId,
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      res.send("Email sent!");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

module.exports = router;
