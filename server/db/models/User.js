const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  user_id: {
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
});

const User = mongoose.model("User", schema);

module.exports = User;
