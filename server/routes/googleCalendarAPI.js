const express = require("express");
const db = require("../db/models");
const getAvailability = require("../utils/googleCalendarUtils");

const router = new express.Router();

// get user's availability from google calendar
router.post("/api/calendar/availability", async (req, res) => {
  const day = req.query.day;
  console.log(day);
  if (req.body.members.length > 1) {
    // team availability
  } else {
    try {
      const usr = await db.User.findById(req.body.members[0]);
      const tokenStore = await db.AuthStore.findOne({ email: usr.email });
      const authToken = tokenStore.googleAuthToken;
      const availability = await getAvailability(authToken, day);
      res.status(200).send({ availability });
    } catch (err) {
      console.log(err);
      res.status(500).send("error getting calendar availability");
    }
  }
});

module.exports = router;
