const mongoose = require("mongoose");
const { User } = require("./User");

const Schema = mongoose.Schema;

const schema = new Schema({
  members: {
    type: [User],
  },
  name: {
    type: String,
  },
});

const Team = mongoose.model("Team", schema);

module.exports = Team;
