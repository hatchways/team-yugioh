const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  hostId: {
    type: String, // Using string type here to prevent type conversion error since all we care if whether a given id value matches it
  },
  name: {
    //attendee name
    type: String,
  },
  email: {
    //attendee email
    type: String,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  time: {
    type: Date,
  },
  timezone: {
    // TODO: validate timezone
    type: String,
  },
});

const Appointment = mongoose.model("Appointment", schema);

module.exports = Appointment;
