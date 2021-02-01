const express = require("express");
const db = require("../db/models");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE team
router.post("/api/team/create", auth, (req, res) => {
  db.Team.create(req.body)
    .then((response) => res.send(response))
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

// ADD Team member
router.get("/api/team/add", auth, (req, res) => {
  db.Team.updateOne({ _id: req.body.teamId }, { $push: req.body.member })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send(error);
    });
});

// REMOVE team member
router.post("/api/team/remove", auth, (req, res) => {
  db.Team.findById(req.body.teamId, (team) => {
    const newTeam = team.filter(({ user_id }) => user_id != req.body.userId);

    db.Team.updateOne({ _id: req.body.teamId }, { $set: newTeam })
      .then((response) => res.send(response))
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  });
});

// Change Admin
router.post("/api/team/admin", auth, (req, res) => {
  db.User.updateOne({ _id: req.body.newAdminId }, { $set: { isAdmin: true } })
    .then(() => {
      db.User.updateOne({ _id: req.userId }, { $set: { isAdmin: false } })
        .then((response) => res.send(response))
        .catch((error) => {
          console.log(error);
          res.status(500).send(error);
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = router;
