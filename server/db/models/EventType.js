const mongoose = require("mongoose");

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
});

const EventType = mongoose.model("EventType", schema);

module.exports = EventType;
