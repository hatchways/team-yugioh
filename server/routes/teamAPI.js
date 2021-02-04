const express = require("express");
const db = require("../db/models");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE team
// req.body: { name: name, members: [email:string] }
router.post("/api/team/create", auth, async (req, res) => {

  try {
    const results = await db.User.find({
      email: { $in: req.body.members },
    });

    const team = results.map(result => result._id);
    // adding member creating the team
    team.push(req.userId);

  
    let response = await db.Team.create({ name: req.body.name, members: team });

    //set creating user as admin
    await db.User.updateOne({_id:req.userId},{teamId:response._id, isAdmin:true})

    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Get team info
// :id=team id
router.get("/api/team/:id", auth, (req, res) => {
  db.Team.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(400).send(error);
    });
});

// ADD Team member
// req.body: { teamId: teamId, memberId: userId }
router.get("/api/team/add", auth, (req, res) => {
  db.Team.updateOne(
    { _id: req.body.teamId },
    { $push: { members: req.body.memberId } }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send(error);
    });
});


// Change Team name
// req.body: { teamId: teamId, name: teamName }
router.post("/api/team/updatename", auth, (req, res) => {
  db.Team.updateOne(
    { _id: req.body.teamId },
    { name:req.body.name }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send(error);
    });
});

// REMOVE team member
// req.body: { teamId: teamId, memberId: userId }
router.post("/api/team/remove", auth, (req, res) => {
  db.Team.findById(req.body.teamId, (team) => {
    const newTeam = team.filter(({ user_id }) => user_id != req.body.memberId);

    db.Team.updateOne({ _id: req.body.teamId }, { $set: newTeam })
      .then((response) => res.send(response))
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  });
});

// Change Admin
// req.body: { newAdminId: userId }
router.post("/api/team/admin", auth, (req, res) => {
  db.User.updateOne({ _id: req.body.newAdminId }, { $set: { isAdmin: true } })
    .then(() => {
      db.User.updateOne({ _id: req.userId }, { $set: { isAdmin: false } });
    })
    .then((response) => res.send(response))
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = router;
