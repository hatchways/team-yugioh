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
router.get("/api/event/is_unique", auth, (req, res) => {
  db.EventType.find({ link: req.query.URL, userId: req.userId }).then(
    (data) => {
      if (data.length > 0) {
        res.status(400).send(new Error("URL is already taken."));
      } else {
        res.status(200).send("URL is available!");
      }
    }
  );
});

// GET event details
router.get("/api/event_details/:pref/:suf", (req, res) => {
  console.log(req.params);
  db.EventType.find({ link: `${req.params.pref}/${req.params.suf}` })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send(error);
    });
});

module.exports = router;
