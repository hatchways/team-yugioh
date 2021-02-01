const mongoose = require("mongoose");
const { User } = require("./User");

const Schema = mongoose.Schema;

const schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  duration: {
    type: Number,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  color: {
    type: String,
  },
  link: {
    type: String,
  },
  members: {
    type: [User],
  },
  active: {
    type: Boolean, default: true,
  }
});

const EventType = mongoose.model("EventType", schema);

module.exports = EventType;
