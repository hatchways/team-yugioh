const express = require("express");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

const request = require("request");

// Send confirmation email
router.post("/api/email", (req, res) => {
  const { eventName, time, host, appointmentId, name, email } = req.body;
  var options = {
    method: "POST",
    url: "https://api.sendgrid.com/v3/mail/send",
    headers: {
      "content-type": "application/json",
      authorization: "Bearer " + process.env.SENDGRID_API_KEY,
    },
    body: {
      personalizations: [
        {
          to: [
            {
              email: email,
              name: name,
            },
          ],
          dynamic_template_data: {
            eventName: eventName,
            time: time,
            host: host,
            appointmentId: appointmentId,
            name: name,
          },
          subject: "Test",
        },
      ],
      from: {
        email: "calendappygo@gmail.com",
        name: "Calendy",
      },
      reply_to: {
        email: "calendappygo@gmail.com",
        name: "Calendy",
      },
      template_id: "d-d64b6ea55b9a4de28df401d8cf682a1a",
    },
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(response);
    console.log(body);
  });
});

module.exports = router;
