const express = require("express");
const db = require("../db/models");
const auth = require("../middleware/auth");

const router = express.Router();

// 1 - Create a new team event type
router.post("/api/team-event", async (req, res) => {
  // RECIEVE: a name, description, array of emails

  const emails = [
    "mattcharlesh@gmail.com",
    "kozaktaras15@gmail.com",
    "uesttser@gmail.com",
    "alvyjudy@gmail.com",
  ];

  const teamName = "Team Yu Gi Oh";

  try {
    const invitedUserIds = await db.User.find({
      email: { $in: emails },
    });
    const invitedUserIdsClean = invitedUserIds.map((usr) => usr._id);
    console.log(invitedUserIds)
    const teamUserIds = await db.Team.findOne(
      { name: teamName },
      { members: 1 }
    );

    if (teamUserIds.length !== invitedUserIdsClean.length) res.status(400).send();

    invitedUserIdsClean.forEach((member) => {
      if (!teamUserIds.members.includes(member)) res.status(400).send();
    });
    const emailsArrOfObjects = [
      {email: "mattcharlesh@gmail.com"},
      {email: "kozaktaras15@gmail.com"},
      {email: "uesttser@gmail.com"},
      {email: "alvyjudy@gmail.com"},
    ];
    const eventName = 'The best event ever'
    const newEventTypeObj = {
      members: emailsArrOfObjects,
      name: eventName
    };
    console.log(newEventTypeObj)

    const response = await db.EventType.create(newEventTypeObj)
    //console.log(response)
    res.send(res);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// 2 - Add or remove members from an event type
// an updated team member object is passed to DB to update added and removed members
router.put("/api/team/:id", (req, res) => {
  db.Team.updateOne(
    { _id: req.params.id },
    { teamMembers: req.body.members },
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

// router.post("/api/team-event", async (req, res) => {
//   const emails=req.body.members
//   const userIds= await db.User.find({email:{$in:emails}})
//   const userIdsClean= userIds.map(usr=>usr._id);
//   const team= await db.Team.findOne({name:req.body.teamName}, {members:1})
  
//   if(req.body.members.length!==userIdsClean.length)
//   res.status(400).send();
  
//   userIdsClean.forEach(member=>{
//   if(!team.members.includes(member))
//     res.status(400).send();
// })