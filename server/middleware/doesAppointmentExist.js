const dbAppointment = require("../db/models/Appointment");

const doesAppointmentExist = async (req, res, next) => {
  // Read the eventId from url parameters and perform a query in the database
  // If the event exists, set req.eventExist to true
  // Otherwise, set to false
  //
  // URL must contain:  `/:eventId`
  // Example:
  // `/api/appointment/:eventId`
  // `/api/appointment/cancel/:eventId`
  // `/api/appointment/reschedule/:eventId`

  const { eventId } = req.params;
  const result = await dbAppointment.find({});
};

module.exports = doesAppointmentExist;
