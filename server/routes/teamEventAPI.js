const express = require("express");
const db = require("../db/models");
const auth = require("../middleware/auth");

const router = express.Router();

const EMAILS = [
  "mattcharlesh@gmail.com",
  "kozaktaras15@gmail.com",
  "uesttser@gmail.com",
  "alvyjudy@gmail.com",
];

const TEAMNAME = "Team Yu Gi Oh";

// 1 - Create a new team event type
router.post("/api/team-event", async (req, res) => {
  // RECIEVE: a name, description, array of emails

  try {
    const invitedUserIds = await db.User.find({
      email: { $in: EMAILS }},{_id:1});
    const invitedUserIdsClean = invitedUserIds.map((usr) => usr._id);
    
    const teamUserIds = await db.Team.findOne(
      { name: TEAMNAME },
      { members: 1 }
    );

    if (teamUserIds.length !== invitedUserIdsClean.length) res.status(400).send();

    invitedUserIdsClean.forEach((member) => {
      if (!teamUserIds.members.includes(member)) res.status(400).send();
    });
   
    const eventName = 'The best event ever'
    const newEventTypeObj = {
      members: invitedUserIds,
      name: eventName
    };
    console.log(newEventTypeObj)

    const data = await db.EventType.create(newEventTypeObj)
    //console.log(response)
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// 2 - Add or remove members from an event type
router.put("/api/team-event/members", async (req, res) => {
  // RECIEVE an updated team member object
  
  try {
    const invitedUserIds = await db.User.find({
      email: { $in: EMAILS },
    });
    const invitedUserIdsClean = invitedUserIds.map((usr) => usr._id);
    console.log(invitedUserIds)
    const teamUserIds = await db.Team.findOne(
      { name: TEAMNAME },
      { members: 1 }
    );

    invitedUserIdsClean.forEach((member) => {
      if (!teamUserIds.members.includes(member)) res.status(400).send();
    });
   
    const eventName = 'The best event ever'

    // includes emails or ids?
    const updatedMembersObj = {
      members: emails,
      name: eventName
    };

    const data = await db.EventType.updateOne(
      { _id: req.body.id },
      { members: req.body.members },
      { overwrite: true }
    )
    
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
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