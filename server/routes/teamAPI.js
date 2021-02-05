const express = require("express");
const db = require("../db/models");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE team
// req.body: { name: name, members: [email:string] }
router.post("/api/team/create", auth, async (req, res) => {
  try {
    const results = await db.User.find({
      email: { $in: req.body.members }
    });

    const team = results.map(result => result._id);

    // adding member creating the team
    team.push(req.userId);

    let response = await db.Team.create({ name: req.body.name, members: team });

    //update user records of all users with teamId
    const updatedMembers = await db.User.updateMany(
      { _id: { $in: team } },
      { teamId: response._id, isAdmin: false }
    );
    //set creating user as admin
    const updatedUser = await db.User.updateOne(
      { _id: req.userId },
      { isAdmin: true }
    );
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
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log(error.message);
      res.status(400).send(error);
    });
});

// ADD Team member
// req.body: { teamId: teamId, memberEmails: [emails] }
router.get("/api/team/add", auth, async (req, res) => {
  //convert emails to memberIDs

  const addedUserIds = await db.User.find({
    email: { $in: req.body.memberEmails },
  });

  const addedUserIdsClean = addedUserIds.map((usr) => usr._id);

  db.Team.updateOne(
    { _id: req.body.teamId },
    { $push: {members:{$each:{ addedUserIdsClean }}} }
  )
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send(error);
    });
});

// Change Team name
// req.body: { teamId: teamId, name: teamName }
router.post("/api/team/updatename", auth, (req, res) => {
  db.Team.updateOne({ _id: req.body.teamId }, { name: req.body.name })
    .then(res.send())
    .catch(error => {
      console.log(error.message);
      res.status(500).send(error);
    });
});

// REMOVE team member
// req.body: { teamId: teamId, memberId: userId }
router.post("/api/team/remove", auth, async (req, res) => {
  try {
    const team = await db.Team.findById(req.body.teamId);

    const newTeam = team.members.filter(
      user_id => user_id != req.body.memberId
    );
    await db.Team.updateOne({ _id: req.body.teamId }, { members: newTeam });

    //update deleted user's profile
    await db.User.updateOne(
      { _id: req.body.memberId },
      { teamId: null, isAdmin: null }
    );
    res.send({ _id: body.memberId });
  } catch (err) {
    console.log(err);
    res.status(500).send("delete failed");
  }
});

// Change Admin
// req.body: { newAdminId: userId }
router.post("/api/team/admin", auth, (req, res) => {
  db.User.updateOne({ _id: req.body.newAdminId }, { $set: { isAdmin: true } })
    .then(() => {
      db.User.updateOne({ _id: req.userId }, { $set: { isAdmin: false } });
    })
    .then(response => res.send(response))
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

//Get all members info
router.get("/api/team/members/:teamID", async (req, res) => {
  console.log("teamID:", req.params.teamID);
  try {
    const data = await db.Team.findById(req.params.teamID).populate("members");
    console.log("populated!!!!", data);
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
