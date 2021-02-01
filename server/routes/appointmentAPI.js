const express = require("express");
const db = require("../db/models");
const auth = require("../middleware/auth");
const ensureAppointmentExists = require("../middleware/ensureAppointmentExists");
const router = express.Router();

// CREATE appointment
router.post("/api/appointment", async (req, res) => {
  // req.body {eventId, name, email, notes, timezone, time}
  try {
    const { eventId } = req.body;

    //get the userId that's hosting this event
    const { userId: hostId } = await db.EventType.findOne({ _id: eventId });

    //create the appointment with a hostId
    const responseFromCreate = db.Appointment.create({
      ...req.body,
      hostId,
    });

    res.send(responseFromCreate);
  } catch (e) {
    res.status(500).send(error);
  }
});

// GET all appointments for user. Query via userId
router.get("/api/all-appointments", auth, (req, res) => {
  db.Appointment.find({ hostId: req.userId })
    .then((data) => {
      //data: [{_id, email, eventId, hostId, name, time, timezone},...]
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

router.delete(
  "/api/appointment/cancel/:appointmentId",
  ensureAppointmentExists,
  async (req, res) => {
    const appointmentId = req.appointmentId;
    await db.Appointment.deleteOne({ _id: appointmentId });
    res.send("Appointment successfully deleted. ID:" + appointmentId);
  }
);

router.get(
  "/api/appointment/detail/:appointmentId",
  ensureAppointmentExists,
  async (req, res) => {
    const appointmentId = req.appointmentId;

    const appointmentDetails = await db.Appointment.findOne({
      _id: appointmentId,
    });
    const { eventId, name: attendeeName, time } = appointmentDetails;
    const eventTypeDetails = await db.EventType.findOne({ _id: eventId });
    const {
      link: eventUrl,
      duration,
      name: eventName,
      description: eventDescription,
    } = eventTypeDetails; // renaming for proper nomenclature

    res.send({
      eventUrl,
      duration,
      attendeeName,
      eventName,
      time,
      eventDescription,
    });
  }
);

module.exports = router;
