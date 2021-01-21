const express = require("express");
const db = require("../db/models");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE meeting
router.post("/api/event", auth, (req, res) => {
  if (req.body.duration) {
    db.EventType.create({ ...req.body, user_id: req.userId })
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
  db.EventType.find({ user_id: req.userId })
    .then((data) => res.send(data))
    .catch((error) => {
      console.log(error.message);
      res.status(500).send(error);
    });
});

module.exports = router;
