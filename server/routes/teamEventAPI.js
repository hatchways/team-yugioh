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
  "daniel@hatchways.io"
];

const EVENT_TYPE_ID = "601af6fce7743b6d7b22eb15";

const NON_TEAM_EMAILS = [
  "asdfsdf@ggg.ca",
  "effffff@erer.com",
  "mattcharlesh@gmail.com",
  "sdfsdfsdf@ddfd.ca"
]



// 1 - Create a new team event type
router.post("/api/team-event/create", async (req, res) => {
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

    if (EMAILS.length > invitedUserIdsClean.length) {
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

    const teamUserIds = await db.Team.findOne(
      { name: TEAM_NAME }, // change to req.body.teamName
      { members: 1 }
    );

    if (UPDATE_USER_EMAILS.length > updatedUserIdsClean.length) {
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
router.delete("/api/team-event/delete/", (req, res) => {
  // deleting a record
  db.EventType.findOneAndRemove({ _id: req.body.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// 4 - Update an event type
router.post("/api/team-event/update-event/", async (req, res) => {
  const updatedEventObj = { name: "NO YEAH TEAM", color: "green" };
  try {
    const data = await db.EventType.updateOne(
      { _id: req.body.id },
      { $set: updatedEventObj } //change to req.body
    ); 
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
