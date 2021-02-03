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

const TEAM_NAME = "Team Yu Gi Oh";

const UPDATE_USER_EMAILS = [
  "mattcharlesh@gmail.com",
  "kozaktaras15@gmail.com",
  "alvyjudy@gmail.com",
];

const EVENT_TYPE_ID = "601ad52cab1b025396682324";

// 1 - Create a new team event type
router.post("/api/team-event", async (req, res) => {
  // RECIEVE: a name, description, array of emails

  try {
    const invitedUserIds = await db.User.find({
      email: { $in: EMAILS },
    });
    const invitedUserIdsClean = invitedUserIds.map((usr) => usr._id);
    const teamUserIds = await db.Team.findOne(
      { name: TEAM_NAME },
      { members: 1 }
    );

    if (teamUserIds.members.length !== invitedUserIdsClean.length) {
      res.status(400).send();
      return;
    }

    invitedUserIdsClean.forEach((member) => {
      if (!teamUserIds.members.includes(member)) {
        res.status(400).send();
        return;
      }
    });

    const eventName = "The best event ever";
    const newEventTypeObj = {
      members: invitedUserIdsClean,
      name: eventName, //change to req.body.eventName
    };

    const data = await db.EventType.create(newEventTypeObj);
    //console.log(response)
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// 2 - Add or remove members from an event type
router.put("/api/team-event/update-members/", async (req, res) => {
  // RECIEVE an updated team member object
  try {
    const updatedUserIds = await db.User.find({
      email: { $in: UPDATE_USER_EMAILS }, // change to req.body.teamName
    });
    const updatedUserIdsClean = updatedUserIds.map((usr) => usr._id);
    console.log(updatedUserIdsClean);

    const teamUserIds = await db.Team.findOne(
      { name: TEAM_NAME }, // change to req.body.teamName
      { members: 1 }
    );

    updatedUserIdsClean.forEach((member) => {
      if (!teamUserIds.members.includes(member)) {
        res.status(400).send();
        return;
      }
    });

    const data = await db.EventType.updateOne(
      { _id: EVENT_TYPE_ID }, // change to req.params.id
      { members: updatedUserIdsClean }
    );

    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// 3 - Delete an event type
router.delete("/api/team-event/delete/:id", (req, res) => {
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
router.post("/api/team-event/update-event/:id", async (req, res) => {
  const updatedEventObj = { name: "NO YEAH TEAM", color: "green" };
  try {
    const data = await db.EventType.updateOne(
      { _id: req.params.id },
      { $set: updatedEventObj } //change to req.body
    ); 
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
