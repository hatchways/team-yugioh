const express = require("express");
const db = require("../db/models");
const getAvailability = require("../utils/googleCalendarUtils");

const router = new express.Router();

// get user's availability from google calendar
router.post("/api/calendar/availability", async (req, res) => {
  const day = new Date(req.query.day);
  if (req.body.members.length > 1) {
    // team availability
  } else {
    try {
      const availability = [];
      const usr = await db.User.findById(req.body.members[0]);
      if (usr.availableDays.includes(day.getDay())) {
        const tokenStore = await db.AuthStore.findOne({ email: usr.email });
        const authToken = tokenStore.googleAuthToken;
        const googleCal = await getAvailability(authToken, day);

        // convert user's times to UTC
        const usrUTC = {
          start: new Date(
            day.setHours(
              parseInt(usr.availableTime.start.substring(0, 2)),
              parseInt(usr.availableTime.start.substring(3))
            )
          ),
          end: new Date(
            day.setHours(
              parseInt(usr.availableTime.end.substring(0, 2)),
              parseInt(usr.availableTime.end.substring(3))
            )
          ),
        };
        if (usr.timezone) {
          usrUTC.start = new Date(
            usrUTC.start.setHours(usrUTC.start.getHours() - usr.timezone)
          );
          usrUTC.end = new Date(
            usrUTC.end.setHours(usrUTC.end.getHours() - usr.timezone)
          );
        }
        // merge with google calendar
        for (let block of googleCal) {
          const newBlock = { ...block };
          if (usrUTC.start > block.end || usrUTC.end < block.start) {
            continue;
          } else if (usrUTC.start > block.start) {
            newBlock.start = day.setHours(usrUTC.start);
          } else if (usrUTC.end < block.end) {
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
