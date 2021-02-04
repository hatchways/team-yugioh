const express = require("express");
const db = require("../db/models");
const auth = require("../middleware/auth");

const router = express.Router();

// 1 - Create a new team event type
router.post("/api/team-event/create", async (req, res) => {
  // Request: {name:eventName, teamName, emails:[array], ...}

  try {
    const invitedUserIds = await db.User.find({
      email: { $in: req.body.emails },
    });
    const invitedUserIdsClean = invitedUserIds.map((usr) => usr._id);
    const teamUserIds = await db.Team.findOne(
      { name: req.body.teamName },
      { members: 1 }
    );

    if (req.body.emails.length > invitedUserIdsClean.length) {
      console.log('there are more emails then valid users found so some of the email are not users')
      res.status(400).send();
      return;
    }

    invitedUserIdsClean.forEach((member) => {
      if (!teamUserIds.members.includes(member)) {
        console.log('one or more of the invited emails are users but are not in this team')
        res.status(400).send();
        return;
      }
    });

    const newEventTypeObj = {
      members: invitedUserIdsClean,
      ...req.body
    };
    delete newEventTypeObj.teamName;


    const data = await db.EventType.create(newEventTypeObj);
    
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// 2 - Add or remove members from an event type
router.put("/api/team-event/update-members/", async (req, res) => {
  // Request: an updated array of team member emails, teamName, eventId
  try {
    const updatedUserIds = await db.User.find({
      email: { $in: req.body.emails },
    });
    const updatedUserIdsClean = updatedUserIds.map((usr) => usr._id);

    const teamUserIds = await db.Team.findOne(
      { name: req.body.teamName}, 
      { members: 1 }
    );

    if (req.body.emails.length > updatedUserIdsClean.length) {
      console.log('there are more emails then valid users found so some of the email are not users')
      res.status(400).send();
      return;
    }

    updatedUserIdsClean.forEach((member) => {
      if (!teamUserIds.members.includes(member)) {
        console.log('one or more of the invited emails are users but are not in this team')
        res.status(400).send();
        return;
      }
    });

    const data = await db.EventType.updateOne(
      { _id: req.body.eventId }, 
      { members: updatedUserIdsClean }
    );

    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// 3 - Delete an event type
router.delete("/api/team-event/delete", (req, res) => {
  // deleting a record
  db.EventType.deleteOne({ _id: req.body.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// 4 - Update an event type
router.post("/api/team-event/update-event/", async (req, res) => {
  try {
    const data = await db.EventType.updateOne(
      { _id: req.body.id },
      { $set: req.body } 
    ); 
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
