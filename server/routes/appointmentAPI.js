const express = require("express");
const db = require("../db/models");
const auth = require("../middleware/auth");
const ensureAppointmentExists = require("../middleware/ensureAppointmentExists");
const getEventDetailViaId = require("../utils/getEventDetailsViaId");
const router = express.Router();

// CREATE appointment
router.post("/api/appointment", async (req, res) => {
  // req.body {eventId, name, email, notes, timezone, time}
  try {
    const { eventId } = req.body;

    //get the userId that's hosting this event
    const { userId: hostUserId } = await db.EventType.findOne({ _id: eventId });

    //create the appointment with a hostId
    const responseFromCreate = db.Appointment.create({
      ...req.body,
      hostUserId,
    });

    res.send(responseFromCreate);
  } catch (e) {
    res.status(500).send(error);
  }
});

// GET all appointments for user. Query via userId.
// Returns an array (could be of length 0) containing the details of the appointment
// [{
//   _id, // appointmentId
//   eventId,
//   hostUserId,
//   name, // attendee's name
//   email, // attendee's email
//   time, // ISO8601 foramtted date and time
//   timezone,
//   duration, // a number in minute
//   description,
//   color, // the color of the flag
//   link, // the incomplete link for building invitation link: <hostName>/<eventName>
//   members,
//   active, // indicate whether the event is active or not
// }, ...]
router.get("/api/all-appointments", auth, async (req, res) => {
  try {
    const appointments = await db.Appointment.find({ hostUserId: req.userId });
    if (!appointments.length) {
      throw new Error("noAppointmentsFound");
    }

    const appointmentsWithEventDetailsPromise = appointments.map(
      async (appointment) => {
        const eventDetails = await getEventDetailViaId(appointment.eventId);
        // Order matters, both of them contain a `name` key,
        // in eventDetails, that's the event's name,
        // in appointment, that's the attendee's name
        // I will save only the attendee's name
        // Also, mongoose query returned object is not a regular object
        // need to convert before spreading
        return { ...eventDetails.toObject(), ...appointment.toObject() };
      }
    );

    const appointmentsWithEventDetails = await Promise.all(
      appointmentsWithEventDetailsPromise
    );

    res.status(200).send(appointmentsWithEventDetails);
  } catch (error) {
    if (error.message === "noAppointmentsFound") {
      res.status(400).send("No appointments for the user");
    } else {
      res.status(500).send("Error occurred in /api/all-appointments\n", error);
    }
  }
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
