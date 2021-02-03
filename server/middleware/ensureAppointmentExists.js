const isObjectIdValid = require("mongoose").Types.ObjectId.isValid;
const dbAppointment = require("../db/models/Appointment");

const ensureAppointmentExists = async (req, res, next) => {
  // Read the appointmentId from url parameters and perform a query in the database
  // If the appointment exists, save the id as req.appointmentId and proceed
  // Otherwise, send a 400 response
  //
  // URL must contain:  `/:appointmentId`
  // Example:
  // `/api/appointment/:appointmentId`
  // `/api/appointment/cancel/:appointmentId`
  // `/api/appointment/reschedule/:appointmentId`

  const { appointmentId } = req.params;
  try {
    stringIsValidObjectId(appointmentId);

    //result will return undefined when appointmentId is a valid format but does not exist in database
    const result = await dbAppointment.findOne({ _id: appointmentId });
    if (result) {
      req.appointmentId = appointmentId;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    // the await statement will fail if the appointmentId is in a non-valid format
    if (error.message === "invalidObjId") {
      res.status(400).send("Invalid format in appointment id");
    } else {
      res
        .status(400)
        .send(
          "No appointment found for the provided ID (Error in ensureAppointmentExists mdidleware"
        );
    }
  }
};

// throw an error if the string is not in valid object id format (valid if
// it is a 12 characters long string)
const stringIsValidObjectId = (stringValue) => {
  if (!isObjectIdValid(stringValue)) {
    throw new Error("invalidObjId");
  }
};

module.exports = ensureAppointmentExists;
