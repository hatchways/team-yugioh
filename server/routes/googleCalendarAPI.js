const express = require("express");
const db = require("../db/models");
const getAvailability = require("../utils/googleCalendarUtils");
const dateFns = require("date-fns");

const router = new express.Router();

// get user's availability from google calendar
router.post("/api/calendar/availability", async (req, res) => {
  const day = new Date(req.query.day);
  console.log(day);
  if (req.body.members.length > 1) {
    // team availability
  } else {
    try {
      const usr = await db.User.findById(req.body.members[0]);
      let availability = [];
      // check if day is available
      if (usr.availableDays.includes(day.getDay())) {
        const tokenStore = await db.AuthStore.findOne({ email: usr.email });
        const authToken = tokenStore.googleAuthToken;
        availability = await getAvailability(authToken, day);
        // const googleCal = await getAvailability(authToken, day);
        // for (let block of googleCal) {
        //   const newBlock = { ...block };
        //   if (
        //     usr.availableTime.start > dateFns.getHours(block.end) ||
        //     usr.availableTime.end < dateFns.getHours(block.start)
        //   ) {
        //     continue;
        //   } else if (usr.availableTime.start < dateFns.getHours(block.start)) {
        //     newBlock.start = usr.start;
        //   }
        // }
      }
      res.status(200).send({ availability });
    } catch (err) {
      console.log(err);
      res.status(500).send("error getting calendar availability");
    }
  }
});

module.exports = router;
