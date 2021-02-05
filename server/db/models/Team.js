const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  members:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],
  name: {
    type: String,
  },
});

const Team = mongoose.model("Team", schema);

module.exports = Team;
