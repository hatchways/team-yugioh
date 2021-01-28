const dbAppointment = require("../db/models/Appointment");

const ensureAppointmentExists = async (req, res, next) => {
  // Read the appointmentId from url parameters and perform a query in the database
  // If the appointment exists, proceed
  // Otherwise, send a 400 response
  //
  // URL must contain:  `/:appointmentId`
  // Example:
  // `/api/appointment/:appointmentId`
  // `/api/appointment/cancel/:appointmentId`
  // `/api/appointment/reschedule/:appointmentId`

  const { appointmentId } = req.params;
  const result = await dbAppointment.findOne({ _id: appointmentId });
  if (result) {
    next();
  } else {
    console.log(
      "Appointment does not exist (ensureAppointmentExists middleware)"
    );
    res.status(400).send("No appointment found for the provided ID.");
  }
};

module.exports = ensureAppointmentExists;
