const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  email: {
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
