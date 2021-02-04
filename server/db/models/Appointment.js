const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  hostUserId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  time: {
    type: Date,
  },
  timezone: {
    type: String,
  },
});

const Appointment = mongoose.model("Appointment", schema);

module.exports = Appointment;
