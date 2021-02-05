const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  profilePic: {
    type: String,
  },
  timezone: {
    // TODO: validate timezone
    type: String,
  },
  URL: {
    type: String,
  },
  availableTime: {
    type: mongoose.Schema.Types.Mixed, // {start: "HH:MM", end: "HH:MM"}
  },
  availableDays: {
    type: [Number], // Number indicates day of week. 0: Sunday, 6: Saturday
  },
  subscribed: {
    type: Boolean,
  },
  stripeId: {
    type: String,
  },
  subscriptionId: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
