const express = require("express");
const db = require("../db/models");
const getAvailability = require("../utils/googleCalendarUtils");
const dateFns = require("date-fns");

const router = new express.Router();

// get user's availability
router.post("/api/calendar/availability", async (req, res) => {
  console.log(req.body);
  const day = new Date(req.query.day);
  try {
    let availability = [];
    for (let member of req.body.members) {
      console.log(member);
      const usr = await db.User.findById(member);
      // check if day is available
      if (usr.availableDays.includes(day.getDay())) {
        const tokenStore = await db.AuthStore.findOne({ email: usr.email });
        const authToken = tokenStore.googleAuthToken;
        availability = await getAvailability(authToken, day);
        const googleCal = await getAvailability(authToken, day);

        // convert user's time to UTC
        const usrUTC = {
          start: parseInt(usr.availableTime.start.substring(0, 2)),
          end: parseInt(usr.availableTime.end.substring(0, 2)),
        };
        if (usr.timezone) {
          const diff = usr.timezone.substring(4);
          usrUTC.start = usrUTC.start - diff;
          usrUTC.end = usrUTC.end - diff;
        }

        // merge with google calendar
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
    }
    // merge availabilities
    if (availability.length > 1) {
      availability.sort((a, b) => {
        if (dateFns.isBefore(a, b)) return -1;
        else if (dateFns.isBefore(b, a)) return 1;
        else return 0;
      });

      const stack = [];
      stack.push(availability[0]);
      for (let i = 1; i < availability.length; i++) {
        if (dateFns.isBefore(stack[0].end, availability[i].start)) {
          stack.push(availability[i]);
        } else {
          stack[0].end = availability[i].end;
        }
      }

      availability = [...stack];
    }

    res.status(200).send({ availability });
  } catch (err) {
    console.log(err);
    res.status(500).send("error getting calendar availability");
  }
});

module.exports = router;
