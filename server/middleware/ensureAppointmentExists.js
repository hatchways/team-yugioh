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
  try {
    const result = await dbAppointment.findOne({ _id: appointmentId });
    if (result) {
      //result will return undefined when appointmentId is a valid format but does not exist in database
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    // the await statement will fail if the appointmentId is in a non-valid format
    res
      .status(400)
      .send(
        "No appointment found for the provided ID (Error in ensureAppointmentExists mdidleware"
      );
  }
};

module.exports = ensureAppointmentExists;
