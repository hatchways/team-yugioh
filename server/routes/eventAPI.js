const express = require("express");
const db = require("../db/models");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE meeting
router.post("/api/event", auth, (req, res) => {
  if (req.body.duration) {
    db.EventType.create({ ...req.body, userId: req.userId })
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
  db.EventType.find({ userId: req.userId })
    .then((data) => res.send(data))
    .catch((error) => {
      console.log(error.message);
      res.status(500).send(error);
    });
});

// GET whether event url is unique
router.get("/api/event/is_unique", auth, async (req, res) => {
  console.log(req.userId)
  const user=await db.User.findById(req.userId);
  const prefix=user.URL;
  const url=`${prefix}/${req.query.URL}`;
  db.EventType.find({
    link: encodeURI(url),
    userId: req.userId,
  }).then((data) => {
    if (data.length > 0) {
      res.status(400).send(new Error("URL is already taken."));
    } else {
      res.status(200).send("URL is available!");
    }
  });
});

// GET event details
router.get("/api/event_details/:pref/:suf", (req, res) => {
  const link = `${req.params.pref}/${req.params.suf}`;
  db.EventType.find({ link })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send(error);
    });
});

// Update event type to active or disabled
router.put("/api/event/toggle-active", auth, (req, res) => {
  db.EventType.updateOne(
    { _id: req.body.eventId },
    { $set: { active: req.body.active } }
  )
    .then((data) => res.send(data))
    .catch((error) => {
      console.log(error.message);
      res.status(500).send(error);
    });
});

// GET event details via eventId
router.get("/api/event-details-via-id/:eventId", async (req, res) => {
  try {
    // data: {userId, duration, name, description, color, link, members}
    const data = await db.EventType.findOne({ _id: req.params.eventId });
    res.send(data);
  } catch (error) {
    res.status(500).send("Failed to get event details via its ID");
  }
});

module.exports = router;
