const express = require("express");
const db = require("../db/models");
const auth = require("../middleware/auth");

const router = express.Router();

// 1 - Create a new team event type
router.post("/api/team-event", auth, (req, res) => {
  if (req.body.duration) {
    //
    db.EventType.create({ ...req.body })
      .then((response) => res.send(response))
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  } else if (!req.body.duration) {
    res.status(400).send("Duration is required");
  }
});

// 2 - Add or remove members from an event type
// an updated team member object is passed to DB to update added and removed members
router.put("/api/team/:id", (req, res) => {
  db.Team.updateOne(
    { _id: req.params.id },
    { teamMembers : req.body.members},
    { overwrite: true }
  )
    .then((team) => {
      if (!team.teamMembers) {
        res.status(404).send();
      }
      res.send(team);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// 3 - Delete an event type
router.delete("/api/team-event/:id", (req, res) => {
  // deleting a record
  db.EventType.findOneAndRemove({ _id: req.params.id })
    .then((eventType) => {
      if (!eventType) {
        res.status(404).send();
      }
      res.send("Deleted team event type");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// 4 - Update an event type
router.post("/api/team-event/:id", (req, res) => {
  db.EventType.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((eventType) => {
      if (!eventType) {
        res.status(404).send();
      }
      res.send(eventType);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
