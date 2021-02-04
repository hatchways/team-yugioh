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
        const googleCal = await getAvailability(authToken, day);
        const usrUTC = {
          start: parseInt(usr.availableTime.start.substring(0, 2)),
          end: parseInt(usr.availableTime.end.substring(0, 2)),
        };

        if (usr.timezone) {
          const diff = usr.timezone.substring(4);
          usrUTC.start = usrUTC.start - diff;
          usrUTC.end = usrUTC.end - diff;
        }

        for (let block of googleCal) {
          const newBlock = { ...block };
          const googleStart = new Date(block.start).getHours();
          const googleEnd = new Date(block.end).getHours();

          if (usrUTC.start > googleEnd || usrUTC.end < googleStart) {
            continue;
          } else if (usrUTC.start > googleStart) {
            newBlock.start = day.setHours(usrUTC.start);
          } else if (usrUTC.end < googleEnd) {
            newBlock.end = day.setHours(usrUTC.end);
          }

          availability.push(newBlock);
        }
      }
      res.status(200).send({ availability });
    } catch (err) {
      console.log(err);
      res.status(500).send("error getting calendar availability");
    }
  }
});

module.exports = router;
