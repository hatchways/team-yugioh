const express = require("express");
const db = require("../db/models");
const getAvailability = require("../utils/googleCalendarUtils");

const router = new express.Router();

// get user's availability from google calendar
router.post("/api/calendar/availability", async (req, res) => {
  const day = new Date(req.query.day);
  const availability = [];
  try {
    if (req.body.members.length > 1) {
      const users = await db.User.find({
        _id: { $in: req.body.members },
      });

      for (let user in users) {
        await mergeAvailability(user);
      }

      // merge collective availability
      availability.sort((a, b) => b - a);

      const stack = [];
      stack.push(availability[0]);
      for (let i = 1; i < availability.length; i++) {
        if (stack[stack.length - 1].end < availability[i].start) {
          stack.push(availability[i]);
        } else {
          stack[stack.length - 1].end = availability[i].end;
        }
      }

      availability = [...stack];
    } else {
      const user = await db.User.findById(req.body.members[0]);
      await mergeAvailability(user);
    }
    res.status(200).send({ availability });
  } catch (err) {
    console.log(err);
    res.status(500).send("error getting calendar availability");
  }

  async function mergeAvailability(user) {
    if (user.availableDays.includes(day.getDay())) {
      const tokenStore = await db.AuthStore.findOne({ email: user.email });
      const authToken = tokenStore.googleAuthToken;
      const googleCalendar = await getAvailability(authToken, day);

      // convert user's times to UTC
      const userUTC = {
        start: new Date(
          day.setHours(
            parseInt(user.availableTime.start.substring(0, 2)),
            parseInt(user.availableTime.start.substring(3))
          )
        ),
        end: new Date(
          day.setHours(
            parseInt(user.availableTime.end.substring(0, 2)),
            parseInt(user.availableTime.end.substring(3))
          )
        ),
      };
      if (user.timezone) {
        userUTC.start = new Date(
          userUTC.start.setHours(userUTC.start.getHours() - user.timezone)
        );
        userUTC.end = new Date(
          userUTC.end.setHours(userUTC.end.getHours() - user.timezone)
        );
      }
      // merge with google calendar
      for (let block of googleCalendar) {
        const newBlock = { ...block };
        if (userUTC.start > block.end || userUTC.end < block.start) {
          continue;
        } else if (userUTC.start > block.start) {
          newBlock.start = day.setHours(userUTC.start);
        } else if (userUTC.end < block.end) {
          newBlock.end = day.setHours(userUTC.end);
        }

        availability.push(newBlock);
      }
    }
  }
});

module.exports = router;
